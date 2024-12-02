import { useState } from "react"

/**
 * Checks the strength of a password based on multiple criteria
 * @param {string} password - The password to validate
 * @param {number} minLength - The minimum length of the password (default: 8)
 * @param {number} maxLength - The maximum length of the password (default: 64)
 * @returns {number} A number representing the strength of the password
 */
const validatePasswordStrength = (password, minLength = 8, maxLength = 64) => {
    if (password.length === 0) return []
    const validations = [
        (password.length >= minLength && password.length <= maxLength), 
        ((/[a-z]/).test(password)),
        ((/[A-Z]/).test(password)), 
        ((/[0-9]/).test(password)), 
        ((/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/).test(password)) 
    ]
    const checks = validations.reduce((acc, cur) => [...acc, cur ? 1 : 0], [])
    return checks
}

const LoginForm = () => {
    const strengthText = ["", "bad 💩", "ok 😐", "decent 🙂", "solid 💪"];
    const [showPassword, setShowPassword] = useState(false)
    const [strength, setStrength] = useState(0)
    const [validations, setValidations] = useState([])

    const validatePassword = (e) => {
        const password = e.target.value
        const checks = validatePasswordStrength(password)
        setStrength(checks.reduce((acc, cur) => acc + cur, 0) - 1)
        setValidations(checks)
    }

    return (
        <form>
            <div className="field">
                <input type="email" name="email-input" className="login-form-input" placeholder="@xyz.com" />
                <label htmlFor="email-input" className="login-form-label">Email</label>
            </div>

            <div className="field">
                <input type={showPassword ? 'text' : 'password' } name="password-input" className="input" placeholder="" onChange={validatePassword}/>
                <label htmlFor="password-input" className="login-form-label">Password</label>
                <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? '🙈' : '👁️'}
                </span>
            </div>

            <div className="password-strength">
                <span className={`bar bar-1 ${strength > 0 ? 'bar-show' : ''}`} />
                <span className={`bar bar-2 ${strength > 1 ? 'bar-show' : ''}`} />
                <span className={`bar bar-3 ${strength > 2 ? 'bar-show' : ''}`} />
                <span className={`bar bar-4 ${strength > 3 ? 'bar-show' : ''}`}/>
            </div>

            {validations.length > 0 && validationsList({validations})}
            <div className="strength-text">{strengthText[strength]}</div>
            <button disabled={strength < 3}>Sign Up</button>

        </form>
    )
}

const validationsList = ({ validations }) => {
    if (validations.length < 1) return
    return (
        <ul>
            <li> {validations[0] ? '✔️' : '❌'} must be at least 5 characters</li>
            <li> {validations[1] ? '✔️' : '❌'} must contain a small letter</li>
            <li> {validations[2] ? '✔️' : '❌'} must contain a capital letter</li>
            <li> {validations[3] ? '✔️' : '❌'} must contain a number</li>
            <li> {validations[4] ? '✔️' : '❌'} must contain one of $&+,:;=?@#</li>
        </ul>
    )
}

export default LoginForm