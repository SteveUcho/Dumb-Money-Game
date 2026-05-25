import { Login } from "@ory/elements-react/theme";
import config from "@/../ory.config";
import type { LoginFlow } from "@ory/kratos-client-fetch";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { sdk, sdkError } from "@/ory-sdk";
import "@ory/elements-react/theme/styles.css";

function LoginPage() {
  const [flow, setFlow] = useState<LoginFlow | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // The aal is set as a query parameter by your Ory project
  // aal1 is the default authentication level (Single-Factor)
  // aal2 is a query parameter that can be used to request Two-Factor authentication
  // https://www.ory.sh/docs/kratos/mfa/overview
  const aal2 = searchParams.get("aal2");

  // The login_challenge is a query parameter set by the Ory OAuth2 login flow
  // Switching between pages should keep the login_challenge in the URL so that the
  // OAuth flow can be completed upon completion of another flow (e.g. Registration).
  // https://www.ory.sh/docs/oauth2-oidc/custom-login-consent/flow
  const loginChallenge = searchParams.get("login_challenge");

  // The return_to is a query parameter is set by you when you would like to redirect
  // the user back to a specific URL after login is successful
  // In most cases it is not necessary to set a return_to if the UI business logic is
  // handled by the SPA.
  //
  // In OAuth flows this value might be ignored in favor of keeping the OAuth flow
  // intact between multiple flows (e.g. Login -> Recovery -> Settings -> OAuth2 Consent)
  // https://www.ory.sh/docs/oauth2-oidc/identity-provider-integration-settings
  const returnTo = searchParams.get("return_to");

  const navigate = useNavigate();

  // Get the flow based on the flowId in the URL (.e.g redirect to this page after flow initialized)
  const getFlow = useCallback(
    (flowId: string) =>
      sdk
        // the flow data contains the form fields, error messages and csrf token
        .getLoginFlow({ id: flowId })
        .then((flow) => setFlow(flow))
        .catch(sdkErrorHandler),
    [],
  );

  // initialize the sdkError for generic handling of errors
  const sdkErrorHandler = sdkError(getFlow, setFlow, navigate, "/login", true);

  // Create a new login flow
  const createFlow = () => {
    sdk
      .createBrowserLoginFlow({
        refresh: true,
        aal: aal2 ? "aal2" : "aal1",
        ...(loginChallenge && { loginChallenge: loginChallenge }),
        ...(returnTo && { returnTo: returnTo }),
      })
      // flow contains the form fields and csrf token
      .then((flow) => {
        // Update URI query params to include flow id
        setSearchParams({ ["flow"]: flow.id });
        // Set the flow data
        setFlow(flow);
      })
      .catch(sdkErrorHandler);
  };

  // submit the login form data to Ory
  //   const submitFlow = async (body: UpdateLoginFlowBody) => {
  //     // something unexpected went wrong and the flow was not set
  //     if (!flow) return await navigate("/login", { replace: true });

  //     // we submit the flow to Ory with the form data
  //     sdk
  //       .updateLoginFlow({ flow: flow.id, updateLoginFlowBody: body })
  //       .then(async () => {
  //         // we successfully submitted the login flow, so lets redirect to the dashboard
  //         await navigate("/", { replace: true });
  //       })
  //       .catch(sdkErrorHandler);
  //   };

  useEffect(() => {
    // we might redirect to this page after the flow is initialized, so we check for the flowId in the URL
    const flowId = searchParams.get("flow");
    // the flow already exists
    if (flowId) {
      getFlow(flowId).catch(createFlow); // if for some reason the flow has expired, we need to get a new one
      return;
    }

    // we assume there was no flow, so we create a new one
    createFlow();
  }, []);

  if (!flow) return null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Login
        flow={flow as any}
        config={config}
        components={{
          Card: {},
        }}
      />
    </div>
  );
}

export default LoginPage;
