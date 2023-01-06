import {FlatList, Text, TouchableOpacity, View} from "react-native";
import dayjs from "dayjs";
import {getDayColor, getDayText} from "./util";
import {SimpleLineIcons} from "@expo/vector-icons";

const columnSize = 35

export default ({
                    columns,
                    selectedDate,
                    onPressLeftArrow,
                    onPressHeaderDate,
                    onPressRightArrow,
                    onPressDate,
                    todoList
                }) => {

    const ArrowButton = ({ onPress, iconName }) => {
        return (
            <TouchableOpacity onPress={ onPress } style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
                <SimpleLineIcons name={ iconName } size={15} color="#404040" />
            </TouchableOpacity>
        )
    }
    const ListHeaderComponent = () => {
        const days = [0, 1, 2, 3, 4, 5, 6]
        const currentDateText = dayjs(selectedDate).format("YYYY.MM.DD")

        return (
            <View>
                <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                    <ArrowButton onPress={onPressLeftArrow} iconName="arrow-left" />

                    <TouchableOpacity onPress={onPressHeaderDate}>
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

        const onPress = () => onPressDate(date)

        const isSelected = dayjs(date).isSame(selectedDate, "date")
        const hasTodo = todoList.find(todo => dayjs(todo.date).isSame(dayjs(date), "date"))

        return (
            <Column
                text={dateText}
                color={color}
                opacity={isCurrentMonth ? 1 : 0.4}
                onPress={onPress}
                isSelected={isSelected}
                hasTodo={hasTodo}
            />
        )
    }
    const Column = ({text, color, opacity, disabled, onPress, isSelected, hasTodo}) => {
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
                <Text style={{color, opacity, fontWeight: hasTodo ? "bold" : "normal"}}>{text}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <FlatList
            scrollEnabled={false}
            keyExtractor={(_, index) => `column-${index}`}
            data={columns}
            numColumns={7}
            renderItem={renderItem}
            ListHeaderComponent={ListHeaderComponent}
        />
    )
}