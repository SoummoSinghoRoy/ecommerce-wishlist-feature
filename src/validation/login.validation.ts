import bcrypt from 'bcrypt';
import { LogInRequestBody, LogInValidationResult } from '../Types/types';
import User from '../model/User.model';



const logInValidation = async (loginrequestbody: LogInRequestBody): Promise<LogInValidationResult> => {
  let error: { [field: string]: string } = {};

  if (!loginrequestbody.email) {
    error.email = `Email can't be empty`
  }

  if (!loginrequestbody.password) {
    error.password = `Password can't be empty`
  }

  const validUser: any = await User.findOne({email: loginrequestbody.email});
  if (validUser) {
    const match = await bcrypt.compare(loginrequestbody.password, validUser.password);
    if (!match) {
      error.password = `Password incorrect`
    }
  } else {
    error.email = `Email not valid`
  }
  return {
    error,
    isValid: Object.keys(error).length === 0
  }
}

export default logInValidation;