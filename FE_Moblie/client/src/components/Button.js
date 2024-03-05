import { useState } from "react";
import { Pressable, Text, View } from "react-native";

const Button = ({ children, style, pressed, disabled }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Pressable onPress={pressed} disabled={disabled}>
        {({ pressed }) => (
          <Text
            style={[
              {
                height: 44,
                color: "#fff",
                fontSize: 18,
                padding: 10,
                backgroundColor: disabled ? "lightgray" : pressed ? "#3A5BDE" : "#3797EF",
                borderRadius: 5,
                textAlign: "center",
              },
              style,
            ]}
          >
            {children}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

export default Button;
