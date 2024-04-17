import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
} from '@react-email/components';

export default function ThankyouEmail({ username }) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Thank you for registering...</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Thank you for registering...</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello {username},</Heading>
        </Row>
        <Row>
          <Text>
            Thank you for registering. Please login to your account and update
            your profile.
          </Text>
        </Row>
        <Row>
          <Text>If you did not register, please ignore this email.</Text>
        </Row>
      </Section>
    </Html>
  );
}
