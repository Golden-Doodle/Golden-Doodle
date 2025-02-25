import React, { useState } from "react";
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import * as ImagePicker from "expo-image-picker";  
import TimePicker from "../TimePicker/TimePicker";            

export default function ReportForm() {
    const [date, setDate] = useState<Date>(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [time, setTime] = useState(new Date());
    const [building, setBuilding] = useState("");
    const [room, setRoom] = useState("");
    const [report, setReport] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDayPress = (day: { dateString: string }) => {
        setDate(new Date(day.dateString));
        setShowCalendar(false);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const isFormValid = () => {
        return date && time && building.trim() && report.trim() && category.trim();
    };

    const handleSubmit = () => {
        if (!isFormValid()) {
            Alert.alert("Error", "Please fill in all required fields before submitting.");
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            Alert.alert("Success", "Your report has been submitted.");
        }, 1500);
    };

    return (
        <View style={styles.container}>

            {/* Date Selection */}
            <Text style={styles.label} testID="dateLabel">Select Date</Text>
            <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowCalendar(!showCalendar)}
                testID="dateButton"
            >
                <FontAwesome5 name="calendar-alt" size={18} color="#990000" />
                <Text style={styles.dateText} testID="selectedDate">{date.toISOString().split("T")[0]}</Text>
            </TouchableOpacity>

            {showCalendar && (
                <View style={styles.calendarContainer} testID="calendarContainer">
                    <Calendar
                        current={date.toISOString().split("T")[0]}
                        onDayPress={handleDayPress}
                        markedDates={{
                            [date.toISOString().split("T")[0]]: {
                                selected: true,
                                selectedColor: "#990000",
                            },
                        }}
                        theme={{
                            backgroundColor: "#FFFFFF",
                            calendarBackground: "#FFFFFF",
                            textSectionTitleColor: "#990000",
                            dayTextColor: "#000",
                            todayTextColor: "#FFFFFF",
                            selectedDayBackgroundColor: "#990000",
                            selectedDayTextColor: "#FFFFFF",
                            arrowColor: "#990000",
                            monthTextColor: "#990000",
                        }}
                        style={styles.calendar}
                        testID="calendar"
                    />
                </View>
            )}

            {/* Time Selection */}
            <Text style={styles.label} testID="timeLabel">Select Time</Text>
            <TimePicker selectedTime={time} setSelectedTime={setTime} testID="timePicker" />

            {/* Building Input */}
            <Text style={styles.label} testID="buildingLabel">Building</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter building name"
                placeholderTextColor="#999"
                value={building}
                onChangeText={setBuilding}
                testID="buildingInput"
            />

            {/* Room Number */}
            <Text style={styles.label} testID="roomLabel">Room # (If applicable)</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter room number"
                placeholderTextColor="#999"
                value={room}
                onChangeText={setRoom}
                testID="roomInput"
            />

            {/* Category Dropdown */}
            <Text style={styles.label} testID="categoryLabel">Category</Text>
            <View style={styles.categoryContainer} testID="categoryContainer">
                {["Lost Item", "Safety Issue", "Complaint", "Feedback"].map((item) => (
                    <TouchableOpacity
                        key={item}
                        style={[styles.categoryButton, category === item && styles.categorySelected]}
                        onPress={() => setCategory(item)}
                        testID={`categoryButton-${item}`}
                    >
                        <Text style={[styles.categoryText, category === item && styles.categoryTextSelected]}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Image Upload */}
            <Text style={styles.label} testID="imageLabel">Attach Image (Optional)</Text>
            <TouchableOpacity
                style={styles.imageButton}
                onPress={pickImage}
                testID="imageButton"
            >
                <FontAwesome5 name="camera" size={18} color="#990000" />
                <Text style={styles.imageText} testID="imageText">{image ? "Change Image" : "Upload Image"}</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={styles.previewImage} testID="previewImage" />}

            {/* Report Details */}
            <Text style={styles.label} testID="reportLabel">Report</Text>
            <TextInput
                style={[styles.input, styles.reportInput]}
                placeholder="Describe the on-campus incident"
                placeholderTextColor="#999"
                value={report}
                onChangeText={setReport}
                multiline
                testID="reportInput"
            />

            {/* Submit Report Button */}
            <TouchableOpacity
                style={[styles.submitButton, (!isFormValid() || isSubmitting) && styles.disabledButton]}
                onPress={handleSubmit}
                disabled={!isFormValid() || isSubmitting}
                testID="submitButton"
            >
                <Text style={styles.submitButtonText} testID="submitButtonText">
                    {isSubmitting ? "Submitting..." : "Submit Report"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    anonymousNotice: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        padding: 10,
        borderRadius: 10,
        marginBottom: 15,
        justifyContent: "center",
    },
    anonymousText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#912338",
        marginLeft: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#912338",
        marginBottom: 5,
    },
    dateButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#912338",
        marginBottom: 10,
    },
    dateText: {
        fontSize: 16,
        marginLeft: 10,
        fontWeight: "500",
        color: "#912338",
    },
    calendarContainer: {
        marginBottom: 20,
    },
    calendar: {
        borderWidth: 1,
        borderColor: "#912338",
        borderRadius: 10,
        marginTop: 10,
    },
    categoryContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    categoryButton: {
        backgroundColor: "#fff",
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#912338",
    },
    categorySelected: {
        backgroundColor: "#912338",
    },
    categoryText: {
        color: "#912338",
    },
    categoryTextSelected: {
        color: "#fff",
    },
    imageButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#912338",
        borderRadius: 10,
        marginBottom: 10,
    },
    imageText: {
        marginLeft: 10,
        fontSize: 16,
        color: "#912338",
    },
    previewImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginTop: 10,
    },
    input: {
        backgroundColor: "#fff",
        borderColor: "#912338",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 10,
        color: "#000",
    },
    reportInput: {
        height: 100,
        textAlignVertical: "top",  
    },
    submitButton: {
        backgroundColor: "#912338",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 15,
    },
    submitButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
    disabledButton: {
        backgroundColor: "#ccc",
    },
});