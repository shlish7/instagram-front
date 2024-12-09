
export function LoginPage() {
  
  return (
    <form action="submit" className="login-page">
        <section className="login-section">
        <input type="text" className='login-user-name' placeholder='Phone number, username, or email' />
        <input type="password" className='login-password' placeholder='Password'/>
        <button className="login-btn">Log in</button>
        </section>
    </form>
  )
}

