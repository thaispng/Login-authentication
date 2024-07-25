import Input from "../_ui/Input"
import Button from "../_ui/Button"
export default function Login() {
    return (
        <div className="flex w-full h-[100vh] ">
           <div className="w-1/2 bg-red-800">
           <div className="flex flex-col justify-center items-center h-full">
                <h1 className="text-primary text-1xl font-semibold">Entre na sua conta</h1>
                <div>
                    <Input label="Email*" type="text" placeholder="email@gmail.com" />
                    <Input label="Senha*" type="password" placeholder="Senha" />
                <div className="flex w-full">
                    <Button
                    fullWidth={true}
                    text="Entrar" />
                </div>
                </div>
           </div>

           </div>
        </div>
    )
}