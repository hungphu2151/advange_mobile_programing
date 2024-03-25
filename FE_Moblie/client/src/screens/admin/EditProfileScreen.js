import { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Container from "../../components/Container";
import FormInput from "../../components/FormInput";
import useAppBar from "../../hooks/useAppBar";
import COLORS from "../../utils/color";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

export function EditProfileScreen(){
  useAppBar({ title: "Chỉnh sửa thông tin cá nhân" });
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Container>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.group}>
            <View style={styles.groupItem}>
              <FormInput placeholder="Họ (*)" />
            </View>
            <View style={styles.groupItem}>
              <FormInput placeholder="Tên (*)" />
            </View>
          </View>

          <FormInput placeholder="Gmail (*)" />

          <FormInput placeholder="Số điện thoại (*)" />

          <FormInput placeholder="MSSV (*)" />

          <FormInput placeholder="Chọn khoa (*)" />

          <Dropdown
            style={styles.inputSearch}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Chọn khoa (*)" : "..."}
            searchPlaceholder="Search..."
            value={value}
          />

          <Dropdown
            style={styles.inputSearch}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Chọn phòng ban (*)" : "..."}
            searchPlaceholder="Search..."
            value={value}
          />

          <View style={styles.wrapBtn}>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.textBtn}>Cập nhật</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

const styles = StyleSheet.create({
  group: {
    flexDirection: "row",
    gap: 10,
  },

  groupItem: {
    width: "48%",
  },

  wrapBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  btn: {
    backgroundColor: "#3797EF",
    padding: 18,
    width: "70%",
    borderRadius: 8,
  },

  textBtn: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },

  placeholderStyle: {
    color: COLORS.grayLight,
  },

  inputSearch: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    borderColor: "#00000033",
    backgroundColor: "#FAFAFA",
    marginBottom: 18,
  },
});
