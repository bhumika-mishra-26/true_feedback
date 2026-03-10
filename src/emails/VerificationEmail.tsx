// import {
//   Html,
//   Head,
//   Font,
//   Preview,
//   Heading,
//   Row,
//   Section,
//   Text,
// } from "@react-email/components";

// interface VerificationEmailProps {
//   username: string;
//   otp: string;
// }

// export default function VerificationEmail({
//   username,
//   otp,
// }: VerificationEmailProps) {
//   return (
//     <Html lang="en" dir="ltr">
//       <Head>
//         <title>Verification Code</title>
//         <Font
//           fontFamily="Inter"
//           fallbackFontFamily="Arial"
//           webFont={{
//             url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
//             format: "woff2",
//           }}
//           fontWeight={500}
//           fontStyle="normal"
//         />
//       </Head>

//       <Preview>Verification Code</Preview>

//       <Section>
//         <Row>
//           <Heading as="h1">Hello {username}</Heading>
//         </Row>

//         <Row>
//           <Text>
//             Thank you for registering. Please use the following code to verify
//             your account.
//           </Text>
//         </Row>

//         <Row>
//           <Text>{otp}</Text>
//         </Row>

//         <Row>
//           <Text>
//             If you did not request this code, please ignore this email.
//           </Text>
//         </Row>
//       </Section>
//     </Html>
//   );
// }
import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
            format: "woff2",
          }}
          fontWeight={500}
          fontStyle="normal"
        />
      </Head>

      <Preview>Your verification code</Preview>

      <Section style={{ padding: "20px", textAlign: "center" }}>
        <Row>
          <Heading as="h1">Hello {username}</Heading>
        </Row>

        <Row>
          <Text>
            Thank you for registering. Please use the following code to verify
            your account.
          </Text>
        </Row>

        <Row>
          <Heading as="h2">{otp}</Heading>
        </Row>

        <Row>
          <Text>
            If you did not request this code, please ignore this email.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}