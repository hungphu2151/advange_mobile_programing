import {
    AntDesign,
    Entypo,
    EvilIcons,
    Feather,
    FontAwesome,
    FontAwesome5,
    FontAwesome6,
    Fontisto,
    Foundation,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
    Octicons,
    SimpleLineIcons,
    Zocial,
  } from '@expo/vector-icons';
  
  const MyIcon = ({ name, size, color, iconPackage }) => {
    if (iconPackage === 'AntDesign') {
      return <AntDesign name={name} size={size} color={color} />;
    } else if (iconPackage === 'Entypo') {
      return <Entypo name={name} size={size} color={color} />;
    } else if (iconPackage === 'EvilIcons') {
      return <EvilIcons name={name} size={size} color={color} />;
    } else if (iconPackage === 'Feather') {
      return <Feather name={name} size={size} color={color} />;
    } else if (iconPackage === 'FontAwesome') {
      return <FontAwesome name={name} size={size} color={color} />;
    } else if (iconPackage === 'FontAwesome5') {
      return <FontAwesome5 name={name} size={size} color={color} />;
    } else if (iconPackage === 'FontAwesome6') {
      return <FontAwesome6 name={name} size={size} color={color} />;
    } else if (iconPackage === 'Fontisto') {
      return <Fontisto name={name} size={size} color={color} />;
    } else if (iconPackage === 'Foundation') {
      return <Foundation name={name} size={size} color={color} />;
    } else if (iconPackage === 'Ionicons') {
      return <Ionicons name={name} size={size} color={color} />;
    } else if (iconPackage === 'MaterialCommunityIcons') {
      return <MaterialCommunityIcons name={name} size={size} color={color} />;
    } else if (iconPackage === 'MaterialIcons') {
      return <MaterialIcons name={name} size={size} color={color} />;
    } else if (iconPackage === 'Octicons') {
      return <Octicons name={name} size={size} color={color} />;
    } else if (iconPackage === 'SimpleLineIcons') {
      return <SimpleLineIcons name={name} size={size} color={color} />;
    } else if (iconPackage === 'Zocial') {
      return <Zocial name={name} size={size} color={color} />;
    }
  };
  export default MyIcon;
  