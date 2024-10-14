import * as React from 'react';
import { Text, Image, View, StyleSheet,Platform,Dimensions} from 'react-native';
import Carousel from "react-native-banner-carousel";
 

const BannerWidth = Dimensions.get("window").width; 
const BannerHeight = 200;

 const images = [
     // "https://scontent-lcy1-1.xx.fbcdn.net/v/t39.30808-6/272931950_10158970928753985_8274066431982513398_n.jpg?stp=cp0_dst-jpg_e15_p320x320_q65&_nc_cat=102&ccb=1-5&_nc_sid=8024bb&_nc_ohc=kHE8HEnjBvwAX-hii5w&_nc_ht=scontent-lcy1-1.xx&oh=00_AT9nOOzyF11RiB1oh-rObeWaok1eQw5ajBXFhMOuYDmMLA&oe=625664A5",
      "http://img.itc.cn/photo/j8xeRC9O6Ft",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxb4CIXjStrZzg3bezbc-IX7_gFEE3z0P2sQ&usqp=CAU",
     "https://scontent-lcy1-1.xx.fbcdn.net/v/t1.6435-9/77060466_10156953894248985_9006901776716136448_n.jpg?stp=cp0_dst-jpg_e15_p75x225_q65&_nc_cat=111&ccb=1-5&_nc_sid=110474&_nc_ohc=im9KuqqmEs0AX-px2x8&_nc_ht=scontent-lcy1-1.xx&oh=00_AT-ac-9iEGFXRMGs0BMB2HrDl1eU1MjsdQcnearnk6dwag&oe=62788FD4",
     "https://scontent-lcy1-1.xx.fbcdn.net/v/t1.6435-9/162297729_10158378509808985_7778638925645736226_n.jpg?stp=c0.38.228.226a_cp0_dst-jpg_e15_p228x119_q65&_nc_cat=105&ccb=1-5&_nc_sid=8024bb&_nc_ohc=7zQ3dW2udzMAX8lOEmk&_nc_ht=scontent-lcy1-1.xx&oh=00_AT-DPITz2G3oPtsI48fmEKa-aY37q5Ia83OpX-IwpFF6qw&oe=6275A0CC"
   ];

export default class App extends React.Component {
 
  

renderPage(image, index) {
    return (
      <View key={index}>
        <Image
          style={{ width: BannerWidth, height: BannerHeight }}
          source={{ uri: image }}
        />
      </View>
    );
  }

  render(){
  return (
 
 
 <View style={styles.container}>


 <View >
        <Carousel
          autoplay
          autoplayTimeout={5000}
          loop
          index={0}
          pageSize={BannerWidth}
           
  Animate true
        >
          {images.map((image, index) => this.renderPage(image, index))}
        </Carousel>
      </View>

         <View >
         <Text style={{fontSize:28, color:"red", backgroundColor: "blue", alignContent: "center", justifyContent: "center"}}>
         Welcome To BCU Bank
         </Text>
        </View>
       
               <Text style={{fontSize:28,fontWeight: "bold" ,paddingLeft:85, paddingTop: 55, color: "blue"}} onPress = {
                  () => this.props.navigation.navigate("Login")
               }> Sign In </Text>
          
     </View> 
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
   margin: 10,
    paddingTop: (Platform.OS) === 'ios' ? 10 : 0
  },


  
});
