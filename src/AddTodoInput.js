import {TextInput, TouchableOpacity, View} from "react-native";
import {ITEM_WIDTH} from "./util";
import {AntDesign} from "@expo/vector-icons"

export default ({value, onChangeText, placeholder, onPressAdd, onSubmitEditing, onFocus}) => {
    return (
        <View
            style={{
                width: ITEM_WIDTH,
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center"
            }}
        >
            <TextInput
                onFocus={onFocus}
                blurOnSubmit={false}
                onSubmitEditing={onSubmitEditing}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={{
                    flex: 1,
                    padding: 5,
                    paddingBottom: 10,
                    color: "#595959"
                }}
            />
            <TouchableOpacity onPress={onPressAdd} style={{padding: 5}}>
                <AntDesign name="plus" size={18} color="#595959" />
            </TouchableOpacity>
        </View>
    )
}