import {StatusBar} from 'expo-status-bar';
import {
    Alert,
    FlatList,
    Image, Keyboard,
    KeyboardAvoidingView, Platform, Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import dayjs from "dayjs";
import {bottomSpace, getCalendarColumns, getDayColor, getDayText} from "./src/util";
import { SimpleLineIcons } from "@expo/vector-icons"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import {useCalendar} from "./src/hook/use-calendar";
import {useTodoList} from "./src/hook/use-todo-list";
import Calendar from "./src/Calendar";
import {statusBarHeight, ITEM_WIDTH} from "./src/util";
import {Ionicons} from "@expo/vector-icons"
import Margin from "./src/Margin";
import AddTodoInput from "./src/AddTodoInput";
import {useRef} from "react";



export default function App() {
    const now = dayjs()

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
    const columns = getCalendarColumns(selectedDate)
    const {
        todoList,
        filteredTodoList,
        addTodo,
        removeTodo,
        toggleTodo,
        input,
        setInput,
        resetInput
    } = useTodoList(selectedDate)
    const flatListRef = useRef(null)

    const scrollToEnd = () => {
        setTimeout(() => {
            flatListRef.current?.scrollToEnd()
        }, 200)
    }

    const onPressLeftArrow = subtract1Month

    const onPressRightArrow = add1Month
    const onPressDate = setSelectedDate
    const onPressAdd = () => {
        addTodo()
        resetInput()
        scrollToEnd()
    }
    const onSubmitEditing = () => {
        addTodo()
        resetInput()
        scrollToEnd()
    }

    const onFocus = () => {
        scrollToEnd()
    }

    const ListHeaderComponent = () => {
        return(
            <View
                style={{ paddingTop: statusBarHeight * 2 }}
            >
                <Calendar
                    columns={columns}
                    selectedDate={selectedDate}
                    onPressLeftArrow={onPressLeftArrow}
                    onPressRightArrow={onPressRightArrow}
                    onPressHeaderDate={showDatePicker}
                    onPressDate={onPressDate}
                    todoList={todoList}
                />
                <Margin height={15} />
                <View
                    style={{
                        width: 4,
                        height: 4,
                        borderRadius: 4 / 2,
                        backgroundColor: "#a3a3a3",
                        alignSelf: "center"
                    }}
                />
                <Margin height={15} />
            </View>
        )
    }

    const renderItem = ({ item: todo }) => {
        const isSuccess = todo.isSuccess
        const onPress = () => toggleTodo(todo.id)
        const onLongPress = () => {
            Alert.alert("삭제하시겠어요?", "", [
                {
                    style: "cancel",
                    text: "아니요"
                },
                {
                    text: "네",
                    onPress: () => removeTodo(todo.id)
                }
            ])
        }

        return (
            <Pressable
                onLongPress={onLongPress}
                onPress={onPress}
                style={{
                    width: ITEM_WIDTH,
                    // backgroundColor: todo.id % 2 === 0 ? "pink" : "lightblue",
                    alignSelf: "center",
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    borderBottomWidth: 0.2,
                    borderColor: "#a6a6a6",
                    flexDirection: "row"
            }}>
                <Text
                    style={{
                        fontSize: 14,
                        color: "#595959",
                        flex: 1
                    }}
                >
                    {todo.content}
                </Text>
                <Ionicons
                    name="ios-checkmark"
                    size={17}
                    color={isSuccess ? "#595959" : "#bfbfbf"}
                />
            </Pressable>
        )
    }

    return (
        <Pressable
            style={styles.container}
            onPress={Keyboard.dismiss}
        >
            <Image
                source={{
                    uri: "https://img.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1373-159.jpg?w=1060&t=st=1667524235~exp=1667524835~hmac=8a3d988d6c33a32017e280768e1aa4037b1ec8078c98fe21f0ea2ef361aebf2c"
                }}
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute"
                }}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        ref={flatListRef}
                        data={filteredTodoList}
                        ListHeaderComponent={ListHeaderComponent}
                        renderItem={renderItem}
                    />

                    <AddTodoInput
                        value={input}
                        onChangeText={setInput}
                        placeholder={`${dayjs(selectedDate).format("M월 D일")}에 추가할 투두`}
                        onPressAdd={onPressAdd}
                        onSubmitEditing={onSubmitEditing}
                        onFocus={onFocus}
                    />
                </View>
            </KeyboardAvoidingView>
            <Margin height={bottomSpace}/>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                confirmTextIOS="선택"
                cancelTextIOS="닫기"
            />
            <StatusBar style="auto"/>
        </Pressable>
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
