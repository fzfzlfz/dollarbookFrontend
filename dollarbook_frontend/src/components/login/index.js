import './index.scss';
import React from 'react';
import { Card, Form, Input, Button} from 'antd'
import { useNavigate } from 'react-router-dom';
import * as AuthAPI from '../../utils/AuthAPI';


const Login = (props) => {
  const [isContainerActive, setIsContainerActive] = React.useState(false);
  const registerButton = () => {
     setIsContainerActive(false);
  };  
  const signInButton = () => {
     setIsContainerActive(true);
  };

  const navigate = useNavigate();
  
  const login = (value) => {
      const { email, password } = value;
      AuthAPI.login(email, password).then(
        res => {
          if('err' in res.data){
            const err = `ERROR: ${res.data.err}`;
            alert(err);
          } else {
            if (res.data.accessToken) {
              localStorage.setItem("user", JSON.stringify(res.data));
            }
            alert('SUCCESS');
            navigate('/home');
          }
        },
      )
  }

  const register = (value) => {
      const { email, password } = value;
      AuthAPI.register(email, password).then(
        res => {
          console.log(res.data);
          if('err' in res.data){
            const err = `ERROR ${res.data.err}`;
            alert(err);
          } else {
            alert(res.data.success);
            window.location.reload();
          }
        },
      )
  }

  return (
    <div className='login'>
      <h1>$DollarBook$</h1>
      <h2>Make Dollar Under Control</h2>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card className={`container${isContainerActive ? " right-panel-active" : ""}` } >
          <div className="form-container sign-up-container">
            {/* register */}
            <Form
              validateTrigger={['onBlur']}
              onFinish={register}
            >
              <h1>Create Account</h1>
              <Form.Item
                  name='email'
                  rules={[
                      {
                          required: true,
                          message:'Email Cannot Be Empty!'
                      },
                      {
                          pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                          message: "Incorrect Email Format",
                          validateTrigger: 'onBlur'   
                      }
                  ]}
              >
                  <Input style={{ width: 285 }} size="large" type="email" placeholder="Email" />
              </Form.Item>
              <Form.Item
                  name='password'
                  rules={[
                      {
                          required: true,
                          message:'Password Cannot Be Empty!',
                          validateTrigger: 'onBlur'
                      }
                  ]}
              >
                  <Input style={{ width: 285 }} size="large" placeholder="Password" />
              </Form.Item>
              <Form.Item>
                  <Button type="primary" htmlType="submit" size="large" block>
                  Register
                  </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="form-container sign-in-container">
            {/* login */}
            <Form 
              validateTrigger={['onBlur']}
              onFinish={login}
            >
              <h1>Sign in</h1>
              <Form.Item
                  name='email'
                  rules={[
                      {
                          required: true,
                          message:'Email Cannot Be Empty!'
                      },
                      {
                          pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                          message: "Incorrect Email Format",
                          validateTrigger: 'onBlur'   
                      }
                  ]}
              >
                  <Input style={{ width: 285 }} size="large" placeholder="Email" />
              </Form.Item>
              <Form.Item
                  name='password'
                  rules={[
                      {
                          required: true,
                          message:'Password Cannot Be Empty!',
                          validateTrigger: 'onBlur'
                      }
                  ]}
              >
                  <Input style={{ width: 285 }} size="large" placeholder="Password" />
              </Form.Item>
              <Form.Item>
                  <Button type="primary" htmlType="submit" size="large" block>
                  Sign In
                  </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="ghost" onClick={registerButton}>Login</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className="ghost" onClick={signInButton}>Register</button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <footer>
        <p>
          Created <i className="fa fa-heart" /> by
          <a target="_blank"> Fuzhen Li</a>
        </p>
      </footer>
    </div>
  );

}

export default Login;
