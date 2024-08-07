# TTSOpenAI-Overlimit

The `ttsopenai-overlimit` package allows you to convert text to speech using the TTSOpenAI service, overcoming the 500-character limitation imposed by TTSOpenAI. This package seamlessly handles longer texts by splitting them into manageable chunks and then concatenating the resulting audio files, providing a smooth and continuous speech output for any length of text.

## Installation

To install the package, use npm:

```bash
npm install ttsopenai-overlimit
```

## Usage

Here is an example of how to use the `ttsopenai-overlimit` package to convert text to speech and save it as an audio file.

### Importing the package

First, import the necessary functions from the package:

```javascript
const { ttsOpenAIGetBlob, ttsOpenAIGetFile } = require('ttsopenai-overlimit');
```

### Convert Text to Speech and Get Blob

You can use the `ttsOpenAIGetBlob` function to convert text to speech and get the resulting audio as a Blob object.

```javascript
const data = {
    text: 'Your long text here...',
    voiceId: 1,
    voiceSpeed: 1,
    voiceModel: 'tts-1',
    duration: 200
};

ttsOpenAIGetBlob(data).then(blob => {
    // Handle the Blob object
    console.log('Blob received:', blob);
}).catch(error => {
    console.error('Error:', error);
});
```

### Convert Text to Speech and Save as File

You can use the `ttsOpenAIGetFile` function to convert text to speech and save the resulting audio as a file.

```javascript
const data = {
    text: 'Your long text here...',
    voiceId: 1,
    voiceSpeed: 1,
    voiceModel: 'tts-1',
    duration: 200
};

const outputPath = 'output.mp3';

ttsOpenAIGetFile(data, outputPath).then(() => {
    console.log('File saved successfully');
}).catch(error => {
    console.error('Error:', error);
});
```

## Functions

### ttsOpenAIGetBlob

This function converts text to speech and returns the audio as a Blob object.

**Parameters:**
- `data` (Object): The data object containing the following properties:
  - `text` (string): The text to be converted to speech.
  - `voiceId` (number): The ID of the voice to be used.
  - `voiceSpeed` (number): The speed of the voice.
  - `voiceModel` (string): The model of the voice.
  - `duration` (number): The maximum duration of each text chunk.

**Returns:**
- `Promise<Blob>`: A promise that resolves to the resulting audio Blob.

### ttsOpenAIGetFile

This function converts text to speech and saves the resulting audio as a file.

**Parameters:**
- `data` (Object): The data object containing the following properties:
  - `text` (string): The text to be converted to speech.
  - `voiceId` (number): The ID of the voice to be used.
  - `voiceSpeed` (number): The speed of the voice.
  - `voiceModel` (string): The model of the voice.
  - `duration` (number): The maximum duration of each text chunk.
- `filePathOutput` (string): The path where the resulting audio file will be saved.

**Returns:**
- `Promise<void>`: A promise that resolves when the file has been saved successfully.

## Valid Values

### `voiceId`
- Must be a number between 1 and 6.
- Example: `1`

### `voiceSpeed`
- Must be one of the following values: `1`, `1.25`, `1.5`, `1.75`, `2`.
- Example: `1.5`

### `voiceModel`
- Must be the string `"tts-1"`.
- Example: `"tts-1"`

### `duration`
- Must be a number between 50 and 450.
- Example: `100`


## Example

Here is a complete example of how to use the package:

```javascript
const { ttsOpenAIGetBlob, ttsOpenAIGetFile } = require('ttsopenai-overlimit');

const data = {
    text: 'Your long text here...',
    voiceId: 1,
    voiceSpeed: 1,
    voiceModel: 'tts-1',
    duration: 200
};

const outputPath = 'output.mp3';

ttsOpenAIGetFile(data, outputPath).then(() => {
    console.log('File saved successfully');
}).catch(error => {
    console.error('Error:', error);
});
```

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Author

NULL Command

## Contributing

If you have suggestions for improving this project, feel free to open an issue or submit a pull request on [GitHub](https://github.com/NULL-Command/TTSOPENAI-OVERLIMIT).

## Bugs

If you find a bug, please report it [here](https://github.com/NULL-Command/TTSOPENAI-OVERLIMIT/issues).

## Homepage

For more information, visit the [homepage](https://github.com/NULL-Command/TTSOPENAI-OVERLIMIT.git#readme).