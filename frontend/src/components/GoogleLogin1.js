import { GoogleLogin } from '@react-oauth/google';


const GoogleLogin1 = () => {

    return (
        <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    );
}

export default GoogleLogin1;