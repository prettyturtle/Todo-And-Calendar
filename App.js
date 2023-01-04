import {StatusBar} from 'expo-status-bar';
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import dayjs from "dayjs";
import {getCalendarColumns, getDayColor, getDayText} from "./src/util";
import {useEffect, useState} from "react";
import { SimpleLineIcons } from "@expo/vector-icons"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import {useCalendar} from "./src/hook/use-calendar";

const columnSize = 35
const Column = ({text, color, opacity, disabled, onPress, isSelected}) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={{
                width: columnSize,
                height: columnSize,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: isSelected ? "#c2c2c2" : "transparent",
                borderRadius: columnSize / 2
            }}
        >
            <Text style={{color, opacity}}>{text}</Text>
        </TouchableOpacity>
    )
}
export default function App() {
    const now = dayjs()
    const columns = getCalendarColumns(selectedDate)
    const {
        selectedDate,
        setSelectedDate,
        isDatePickerVisible,
        showDatePicker,
        hideDatePicker,
        handleConfirm,
        subtract1Month,
        add1Month
    } = useCalendar(now)

    const ArrowButton = ({ onPress, iconName }) => {
        return (
            <TouchableOpacity onPress={ onPress } style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
                <SimpleLineIcons name={ iconName } size={15} color="#404040" />
            </TouchableOpacity>
        )
    }

    const onPressLeftArrow = () => subtract1Month

    const onPressRightArrow = () => add1Month

    const ListHeaderComponent = () => {
        const days = [0, 1, 2, 3, 4, 5, 6]
        const currentDateText = dayjs(selectedDate).format("YYYY.MM.DD")

        return (
            <View>
                <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                    <ArrowButton onPress={onPressLeftArrow} iconName="arrow-left" />

                    <TouchableOpacity onPress={showDatePicker}>
                        <Text style={{ fontSize: 20, color: "#404040" }}>{currentDateText}</Text>
                    </TouchableOpacity>

                    <ArrowButton onPress={onPressRightArrow} iconName="arrow-right" />
                </View>
                
                <View style={{flexDirection: "row"}}>
                    {days.map(day => {
                        const dayText = getDayText(day)
                        const color = getDayColor(day)
                        return (
                            <Column
                                key={`day-${day}`}
                                text={dayText}
                                opacity={1}
                                color={color}
                                disabled={true}
                            />
                        )
                    })}
                </View>
            </View>
        )
    }

    const renderItem = ({item: date}) => {
        const dateText = dayjs(date).get("date")
        const day = dayjs(date).get("day")

        const color = getDayColor(day)
        const isCurrentMonth = dayjs(date).isSame(selectedDate, "month")

        const onPress = () => {
            setSelectedDate(date)
        }

        const isSelected = dayjs(date).isSame(selectedDate, "date")

        return (
            <Column
                text={dateText}
                color={color}
                opacity={isCurrentMonth ? 1 : 0.4}
                onPress={onPress}
                isSelected={isSelected}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                keyExtractor={(_, index) => `column-${index}`}
                data={columns}
                numColumns={7}
                renderItem={renderItem}
                ListHeaderComponent={ListHeaderComponent}
             />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                confirmTextIOS="선택"
                cancelTextIOS="닫기"
            />
            <StatusBar style="auto"/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
