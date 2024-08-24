import EmailInput from "~/pages/Auth/AuthRecovery/EmailInput"
import OtpVerification from "~/pages/Auth/AuthRecovery/OtpVerification"
import PasswordReset from "~/pages/Auth/AuthRecovery/PasswordReset"
import SignIn from "~/pages/Auth/SignIn/SignIn"
import SignUp from "~/pages/Auth/SignUp/SignUp"
import Boards from "~/pages/Boards"
import BoardDetail from "~/pages/Boards/_id"

const publicRoutes = [
  { path: "sign-up", element: <SignUp /> },
  { path: "sign-in", element: <SignIn /> },
  { path: "forgot-password/email", element: <EmailInput /> },
  { path: "forgot-password/verify-otp/:email", element: <OtpVerification /> },
  { path: "forgot-password/reset-password/:email", element: <PasswordReset /> },
  { path: "board/:id", element: <BoardDetail /> },
  { path: "boards", element: <Boards /> },
  // { path: "*", element: <NotFoundPage /> },
]

export default publicRoutes
