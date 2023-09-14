import "./Demo.css"
import { demoImg, demoImg2, demoImg3, demoImg4, } from "../../assets"
import ActionBtn from "../ActionBtn/ActionBtn"

const Demo = () => {
    return (
        <>
            <div className="display_img_container">
                <div className="display_img_box">
                    <img src={demoImg} className="display_img" />
                </div>
                <div className="display_img_box">
                    <img src={demoImg2} className="display_img" />
                </div>
                <div className="display_img_box">
                    <img src={demoImg3} className="display_img" />
                </div>
                <div className="display_img_box">
                    <img src={demoImg4} className="display_img" />
                </div>
                <div className="display_img_box">
                    <img src={demoImg3} className="display_img" />
                </div>
                <div className="display_img_box">
                    <img src={demoImg} className="display_img" />
                </div>
            </div>
            <ActionBtn text="See My Work" target="/gallery" />
        </>
    )
}

export default Demo
