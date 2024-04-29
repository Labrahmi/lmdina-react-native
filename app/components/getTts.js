import { AVPlaybackStatusSuccess, Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

async function fetchAudioFromElevenLabsAndReturnFilePath(
  text,
  apiKey,
  voiceSettings,
  voiceId
) {
  const baseUrl =
    "https://api.elevenlabs.io/v1/text-to-speech/ozzlcSramSr4Bqwz12Gx?optimize_streaming_latency=1&output_format=mp3_22050_32";
  const requestOptions = {
    method: "POST",
    headers: {
      "xi-api-key": "cc01be6c1d3b6665097489add1947e08",
      "Content-Type": "application/json",
    },
    body: '{"text":"t","voice_settings":{"stability":0.5,"similarity_boost":0.5}}',
  };

  const requestBody = {
    text,
    voice_settings: voiceSettings,
  };

  // Construct the URL for the POST request
  const url = `${baseUrl}`;

  // Use Expo's FileSystem to download the audio file
  const fileUri = FileSystem.documentDirectory + ".mp3";
  const response = await FileSystem.downloadAsync(url, fileUri, requestOptions);

  if (response.status !== 200) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // Return the local file path
  return fileUri;
}

const waitForDiJustFinishedPlaying = (sound) =>
  new Promise((resolve) => {
    sound.setOnPlaybackStatusUpdate((playbackStatus) => {
      if (playbackStatus.didJustFinish) {
        resolve(null);
      }
    });
  });

async function playAudio(text, apiKey, voiceSettings, voiceId) {
  const path = await fetchAudioFromElevenLabsAndReturnFilePath(
    text,
    apiKey,
    voiceSettings,
    voiceId
  );
  const { sound } = await Audio.Sound.createAsync(
    { uri: `file://${path}` },
    { shouldPlay: true }
  );
  await waitForDiJustFinishedPlaying(sound);
  // Clean up the downloaded file
  FileSystem.deleteAsync(path, { idempotent: true });
}
