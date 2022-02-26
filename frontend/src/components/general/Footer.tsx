import {IoLogoTwitter, IoLogoGithub, IoLogoInstagram} from 'react-icons/io5';

const Footer = () => {
    const footerBlock = "flex flex-col md:mx-10"
    const footerTitle = "font-bold"
    const footerElement = "text-center md:test-left"


    return(
        <div className="p-10 bg-[#0F0E13] lg:mx-48">
            <div className="flex md:justify-end justify-center text-white md:flex-row flex-col">
                <div className={`${footerBlock}`}>
                    <p className={`${footerTitle}`}>Legal</p>
                    <a className={`${footerElement}`}>Terms and Conditions</a>
                    <a className={`${footerElement}`}>Privacy Policy</a>
                    <a className={`${footerElement}`}>Cookies</a>
                </div>
                <div className={`${footerBlock}`}>
                    <p className={`${footerTitle}`}>Get in touch</p>
                    <a className={`${footerElement}`}>dongwookang95@google.com</a>
                </div>
                <div className={`${footerBlock}`}>
                    <p className={`${footerTitle}`}>Follow us</p>
                    <div className="flex justify-center md:justify-start"><a className="flex cursor-pointer"><IoLogoInstagram className="text-white mx-3"/>Instagram</a></div>
                    <div className="flex justify-center md:justify-start"><a className="flex cursor-pointer"><IoLogoTwitter className="text-white mx-3"/>Twitter</a></div>
                    <div className="flex justify-center md:justify-start"><a className="flex cursor-pointer"><IoLogoGithub className="text-white mx-3"/>Github</a></div>
                </div>
                <div className={`${footerBlock}`}>
                    <p className={`${footerTitle}`}>Join our newsletter</p>
                    <form className="flex flex-row justify-center md:justify-start">
                        <input type="text" placeholder="name@email.com" className="text-black rounded-l-md" />
                        <button className="bg-[#333232] py-2 px-5 rounded-r-md">Join</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Footer;