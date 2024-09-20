interface InputProps{
    className: string
    placeholder: string
    type: string
    value: string
    onChange: (event:React.ChangeEvent<HTMLInputElement>) => void
    
}

const InputSimples:React.FC<InputProps> = ({ className, placeholder, type, value, onChange }) => {
    return(
        <div className="w-[100%] flex justify-center">
            
            <input
                className={className}
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChange}
                required
            />

        </div> 
        

    )
}

export default InputSimples