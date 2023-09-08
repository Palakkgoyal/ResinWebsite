import "./About.css"
import ActionBtn from '../ActionBtn/ActionBtn'
import { ownerImg } from '../../assets'

const AboutComponent = () => {
    return (
        <div className="about_container">
            <img src={ownerImg} alt="Mahi Desarla" className="about_img" />
            <div className="about_text_container">
                <h3 className="main_para_styling about_main_text">
                    Hello, I am Adam Halls. A textile artist and painter
                    based on Bodmin Moor, Cornwall. My work is carefully
                    built up of layers of fabric and paint which are
                    brought together with many different stitching techniques.
                </h3>
                <p className="sub_para_styling about_para">
                    I am inspired by the intricate details of algae, Lichens,
                    rust and weathered surfaces. My pieces are incredibly
                    complex, working on layers and welding them together on
                    the sewing machine over many weeks.
                </p>
                <p className="about_para">
                    <br />
                </p>
                <div style={{ paddingTop: "16px" }}>
                    <ActionBtn text="Get In Touch" target="/contact" />
                </div>
            </div>
        </div>
    )
}

export default AboutComponent
