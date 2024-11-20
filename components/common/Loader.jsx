import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Loader = () => {
  return (
    <SafeAreaView>
        <View className="h-screen w-full items-center justify-center">
            <View className="animate-spin w-6 h-6 border-blue-500 border rounded-full"></View>
        </View>
    </SafeAreaView>
  )
}

export default Loader