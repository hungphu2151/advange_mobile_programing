import { StyleSheet, View } from "react-native";
import CardCategory from "~/components/CardCategory";
import Container from "~/components/Container";
import useAppBar from "~/hooks/useAppBar";

const data = [
  { id: 1, title: "Quản lý thông tin cá nhân", icon: "user", to: "EditProfile" },
  { id: 2, title: "Quản lý tài khoản", icon: "user-contact", to: "AccountManager" },
  { id: 3, title: "Quản lý đăng tải", icon: "upload", to: "UploadManager" },
  { id: 4, title: "Thống kê bài viết", icon: "post", to: "StatisticalPost" },
];

const AdminScreen = () => {
  useAppBar({ title: "Trang quản lý" });

  return (
    <Container>
      <View>
        {data.map((t) => (
          <CardCategory key={t.id} icon={t.icon} title={t.title} to={t.to} />
        ))}
      </View>
    </Container>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({
  container: {},
});
