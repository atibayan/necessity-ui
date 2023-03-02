import React from 'react';
import styled from "styled-components";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const Container = styled.div`
    display:flex;
    background-color: #f6f6f6;
`;

const Left = styled.div`
    flex:1;
    display:flex;
    flex-direction: column;
    padding:20px;
`;

const Logo = styled.h1`

`;

const Description = styled.p`
    margin:20px 0px;
`;

const SocialContainer = styled.div`
    display:flex;
`;

const SocialIcon = styled.div`
    width:40px;
    height:40px;
    border-radius:50px;
    color:white;
    background-color: #${props=>props.color};
    display:flex;
    align-items:center;
    justify-content:center;
    margin-right:20px;
`;

const Center = styled.div`
    flex:1;
    padding:20px;
`;

const Title = styled.h3`
    margin-bottom: 30px;
`;

const List = styled.ul`
    margin:0;
    padding:0;
    list-style:none;
    display:flex;
    flex-wrap:wrap;
`;

const ListItem = styled.li`
    width: 50%;
    margin-bottom:10px;
`;

const Right = styled.div`
    flex:1;
    padding:20px;
`;

const ContactItem = styled.div`
width: 100%;
margin-bottom:10px;
`;

const Footer = () => {
    return(
        <Container>
            <Left>
                <Logo>
                    LOGO
                </Logo>
                <Description>
                LOGO is an online fashion brand founded in 2023 with the latest trendy and convenient fashion clothes. 
                </Description>
                <SocialContainer>
                    <SocialIcon>
                        <InstagramIcon/>
                    </SocialIcon>
                    <SocialIcon>
                        <FacebookIcon/>
                    </SocialIcon>
                    <SocialIcon>
                        <PinterestIcon/>
                    </SocialIcon>
                    <SocialIcon>
                        <TwitterIcon/>
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>More Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Woman Fashion</ListItem>
                    <ListItem>Account Info</ListItem>
                    <ListItem>Terms and Conditions</ListItem>
                    <ListItem>QNAs</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact Info</Title>
                <ContactItem>
                    <LocationOnIcon/> New Westminster, British Columbia, Canada
                </ContactItem>
                <ContactItem>
                    <PhoneInTalkIcon/> + 1 999 999 9999
                </ContactItem>
                <ContactItem>
                    <MailOutlineIcon/> Clothing@gmail.com
                </ContactItem>
            </Right>
        </Container>
    )
}

export default Footer;