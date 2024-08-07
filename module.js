const blobToBuffer = require('blob-to-buffer');
const fs = require('fs');

const convertTTS = async (inputString, voiceId, voiceSpeed, voiceModel) => {
    const response = await fetch("https://api.ttsopenai.com/api/v1/public/text-to-speech-stream", {
        headers: {
            "accept": "application/json",
            "accept-language": "en-US,en;q=0.9",
            "authorization": "",
            "content-type": "application/json",
            "priority": "u=1, i",
            "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Google Chrome\";v=\"127\", \"Chromium\";v=\"127\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "Referer": "https://ttsopenai.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        body: JSON.stringify({
            model: voiceModel,
            speed: voiceSpeed,
            input: inputString,
            voice_id: "OA00" + voiceId
        }),
        method: "POST"
    });

    if (response.ok) {
        const responseBlob = await response.blob();
        return responseBlob;
    } else {
        return null;
    }
}

const mergeAudioBlobs = async (blobs) => {
    const arrayBuffers = await Promise.all(blobs.map(blob => blob.arrayBuffer()));

    const totalLength = arrayBuffers.reduce((sum, arrayBuffer) => sum + arrayBuffer.byteLength, 0);

    const mergedArray = new Uint8Array(totalLength);

    let offset = 0;
    for (const arrayBuffer of arrayBuffers) {
        mergedArray.set(new Uint8Array(arrayBuffer), offset);
        offset += arrayBuffer.byteLength;
    }

    const mergedBlob = new Blob([mergedArray], { type: 'audio/mpeg' });

    return mergedBlob;
}

const divString = (sourceString, sDiv) => {
    sourceString = sourceString.trim();
    let sLength = sourceString.length;
    let result = [];
    while (sLength > sDiv) {
        let end = sDiv;
        while (end > 0 && sourceString[end] !== ' ') {
            end--;
        }
        if (end === 0) {
            end = sDiv;
        }
        result.push(sourceString.substring(0, end).trim());
        sourceString = sourceString.substring(end).trim();
        sLength = sourceString.length;
    }
    if (sLength > 0) {
        result.push(sourceString);
    }
    return result;
}

const validateJson = (data) => {
    const requiredKeys = ['text', 'voiceId', 'voiceSpeed', 'voiceModel', 'duration'];
    for (const key of requiredKeys) {
        if (!(key in data)) {
            throw new Error(`Missing required key: ${key}. Example of valid JSON: { "text": "Some text", "voiceId": 1, "voiceSpeed": 1.5, "voiceModel": "tts-1", "duration": 100 }`);
        }
    }

    if (typeof data.text !== 'string' || data.text.trim().length === 0) {
        throw new Error('Invalid value for key "text". It must be a non-empty string. Example: "Some valid text."');
    }

    if (typeof data.voiceId !== 'number' || data.voiceId < 1 || data.voiceId > 6) {
        throw new Error('Invalid value for key "voiceId". It must be a number between 1 and 6. Example: 1');
    }

    const validVoiceSpeeds = [1, 1.25, 1.5, 1.75, 2];
    if (!validVoiceSpeeds.includes(data.voiceSpeed)) {
        throw new Error(`Invalid value for key "voiceSpeed". It must be one of ${validVoiceSpeeds.join(', ')}. Example: 1.5`);
    }

    if (data.voiceModel !== 'tts-1') {
        throw new Error('Invalid value for key "voiceModel". It must be "tts-1". Example: "tts-1"');
    }

    if (typeof data.duration !== 'number' || data.duration < 50 || data.duration > 450) {
        throw new Error('Invalid value for key "duration". It must be a number between 50 and 450. Example: 100');
    }

    return true; 
};

const ttsOpenAIGetBlob = async (data) => {
    validateJson(data);
    try {
        let stringArray = divString(data.text, data.duration);
        const promises = stringArray.map(item => convertTTS(item, data.voiceId, data.voiceSpeed, data.voiceModel));
        const results = await Promise.all(promises);
        let blobs = await mergeAudioBlobs(results);
        return blobs;
    } catch (error) {
        return null;
    }
}

const ttsOpenAIGetFile = async (data, filePathOutput) => {
    validateJson(data);
    try {
        let stringArray = divString(data.text, data.duration);
        const promises = stringArray.map(item => convertTTS(item, data.voiceId, data.voiceSpeed, data.voiceModel));
        const results = await Promise.all(promises);
        let blobs = await mergeAudioBlobs(results);
        const arrayBuffer = await blobs.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        fs.writeFile(filePathOutput, buffer, (err) => {
            if (err) {
                console.error('Failed to save file:', err);
            } else {
                console.log('File saved successfully:', filePathOutput);
            }
        });
    } catch (error) {
        console.error('Error during text to speech conversion:', error);
    }
}

module.exports = {
    ttsOpenAIGetBlob,
    ttsOpenAIGetFile
};