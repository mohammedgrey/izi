import React from "react";
import './About.css'

class About  extends React.Component{

  render(){
    return(
      <div className="about-class" >
     <div className="jumbotron">
      <h1 className="display-4">About izi</h1>
      <p className="lead">izi is an online gifts store that was initiated in *date*. All the gifts at izi are handmade. If you are looking for a place to customize your gifts the way you want it, not the way you found it, then you have come to the right place.   </p>
      <hr className="my-4"/>
      <p className="end-jumbo">Thanks for your interest in izi. <i class="far fa-heart"></i></p>
    </div>
    
    <div className="founder-info">
      <div>
      <h1><i class="fas fa-user-tag"></i> Founder</h1>
      <p><span>Aalaa Mohamed Saad</span> A graphic Designer and Video Animator</p>
      <p>"I have always liked making handmade stuff, and I'd always gift them to my close friends and siblings. I wanted to express how much they are special and mean to me through these gifts. They are the ones who encouraged me to begin making things in the first place, and I have learnt that there is no such thing as waiting for the right time. The right time comes whenever you decide to begin, so begin."</p>

      </div> 
      <img src="https://scontent.fcai20-2.fna.fbcdn.net/v/t31.0-8/12604695_10206962182430596_204161113329371279_o.jpg?_nc_cat=100&_nc_sid=cdbe9c&_nc_eui2=AeHaT0kfyFgdKt8udbm2h69TpwcLiIv4pManBwuIi_ikxtYrZi2s8vi3UH3YHjdf8CHStHZ6CBshUKSeubq0JfKH&_nc_ohc=PuJwaP0H82gAX_mpWRu&_nc_ht=scontent.fcai20-2.fna&oh=6c7ace2d3ecc8fb1210d9463560f0f57&oe=5F1F31E9"></img>
    </div>

    <div className="contact-info">
    <h1><i class="far fa-id-card"></i> Contact us</h1>
    <p><i class="fas fa-phone-alt"></i><i class="fab fa-whatsapp"></i>+201101038345</p>
    <p><i class="fab fa-facebook-f"></i>https://www.facebook.com/izi.handmade</p>
    <p><i class="fab fa-instagram"></i>https://www.instagram.com/izi.handmade</p>
    
      </div>
      
      </div>
      )
  
  }
  
}

export default About;