import { StatusBar } from 'expo-status-bar';
import { Button, Text, Touchable, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Button className="bg-slate-600" title="Press me" onPress={() => alert('Hello World')} />
      {/* <Text className="bg-slate-900 p-2 text-white rounded-xl">Hello World</Text> */}
      <StatusBar style="auto" />
    </View>
  );
}

