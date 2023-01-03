import {StatusBar} from 'expo-status-bar';
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import dayjs from "dayjs";
import {getCalendarColumns, getDayColor, getDayText} from "./util";
import {useEffect} from "react";
import Margin from "./Margin";
import { SimpleLineIcons } from "@expo/vector-icons"


const columnSize = 35
const Column = ({text, color, opacity}) => {
    return (
        <View
            style={{
                width: columnSize,
                height: columnSize,
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Text style={{color, opacity}}>{text}</Text>
        </View>
    )
}
export default function App() {
    const now = dayjs("2022-11-03")

    const columns = getCalendarColumns(now)
    console.log(columns)
    useEffect(() => {

    }, [])

    const ArrowButton = ({ onPress, iconName }) => {
        return (
            <TouchableOpacity onPress={ onPress } style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
                <SimpleLineIcons name={ iconName } size={15} color="#404040" />
            </TouchableOpacity>
        )
    }
    const ListHeaderComponent = () => {
        const days = [0, 1, 2, 3, 4, 5, 6]
        const currentDateText = dayjs(now).format("YYYY.MM.DD")

        return (
            <View>
                <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                    <ArrowButton onPress={null} iconName="arrow-left" />

                    <TouchableOpacity>
                        <Text style={{ fontSize: 20, color: "#404040" }}>{currentDateText}</Text>
                    </TouchableOpacity>

                    <ArrowButton onPress={null} iconName="arrow-right" />
                </View>

                <View style={{flexDirection: "row"}}>
                    {days.map(day => {
                        const dayText = getDayText(day)
                        const color = getDayColor(day)
                        return (
                            <Column
                                key={day}
                                text={dayText}
                                opacity={1}
                                color={color}
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
        const isCurrentMonth = dayjs(date).isSame(now, "month")

        return (
            <Column
                text={dateText}
                color={color}
                opacity={isCurrentMonth ? 1 : 0.4}
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
            >

            </FlatList>
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
