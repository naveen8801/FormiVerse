import React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  CodeBlock,
  dracula,
} from "@react-email/components";
import moment from "moment";

interface IProps {
  name: string;
  form: any;
  response: any;
}

const ResponseReceivedTemplate: React.FC<Readonly<IProps>> = (
  props
): React.ReactElement => {
  const { name, form, response } = props;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  return (
    <Html>
      <Head />
      <Preview>
        A single place to create, edit &amp; manage your forms with easy
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <div style={logo}>
            <div style={mainTitle}>
              <span>Formi</span>
              <span style={span}>Verse</span>
            </div>
          </div>
          <Hr style={hr} />
          <Text style={paragraph}>Hi {name},</Text>
          <Text style={paragraph}>
            A new response has been received for <strong>{form?.title}</strong>{" "}
            at{" "}
            <strong> {moment(response?.createdAt).toDate().toString()}</strong>
          </Text>
          <CodeBlock
            code={JSON.stringify(response?.data, null, 4)}
            lineNumbers
            theme={dracula}
            language="json"
          />
          <Section style={btnContainer}>
            <Button
              style={button}
              href={`${baseUrl}/response/${form?._id?.toString()}`}
            >
              See All Responses
            </Button>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />
            Naveen
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            © Copyright 2024 FormiVerse. All rights reserved
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ResponseReceivedTemplate;

const mainTitle = {
  color: "#FF4C29",
  fontSize: "1.875rem",
  fontWeight: 800,
};

const span = {
  color: "black",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const btnContainer = {
  textAlign: "center" as const,
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#FF4C29",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const logo = {
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
