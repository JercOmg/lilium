import { StyleSheet, Text, View } from "react-native";


export default function AboutScreen() {
return (
    <View style={styles.container}>
    <Text style={styles.title}>about screen</Text>
    <Text style={styles.subtitle}>this is an example</Text>
    </View>
)
}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
        },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 10,
        },
        subtitle: {
            fontSize: 16,
            color: "#666",
        },
    });