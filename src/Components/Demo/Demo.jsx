import "./Demo.css"
import { demoImg, demoImg2, demoImg3, demoImg4, } from "../../assets"
import ActionBtn from "../ActionBtn/ActionBtn"

const Demo = () => {
    return (
        <>
            <div className="demo_container">
                <div className="demo_box">
                    <img src={demoImg} className="demo_img" />
                </div>
                <div className="demo_box">
                    <img src={demoImg2} className="demo_img" />
                </div>
                <div className="demo_box">
                    <img src={demoImg3} className="demo_img" />
                </div>
                <div className="demo_box">
                    <img src={demoImg4} className="demo_img" />
                </div>
                <div className="demo_box">
                    <img src={demoImg3} className="demo_img" />
                </div>
                <div className="demo_box">
                    <img src={demoImg} className="demo_img" />
                </div>
            </div>
            <ActionBtn text="See My Work" target="/gallery" />
        </>
    )
}

export default Demo
