import "@ory/elements-react/theme/styles.css";
import config from "@/ory.config";
import { Settings } from "@ory/elements-react/theme";
import type { SettingsFlow } from "@ory/kratos-client-fetch";
import { sdk, sdkError } from "@/ory-sdk";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

function AuthSettings() {
  const [flow, setFlow] = useState<SettingsFlow | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  // Get the flow based on the flowId in the URL (.e.g redirect to this page after flow initialized)
  const getFlow = useCallback(
    (flowId: string) =>
      sdk
        // the flow data contains the form fields, error messages and csrf token
        .getSettingsFlow({ id: flowId })
        .then((flow) => setFlow(flow))
        .catch(sdkErrorHandler),
    [],
  );

  // initialize the sdkError for generic handling of errors
  const sdkErrorHandler = sdkError(getFlow, setFlow, navigate, "/settings", true);

  const createFlow = () => {
    sdk
      // create a new settings flow
      // the flow contains the form fields, error messages and csrf token
      // depending on the Ory Network project settings, the form fields returned may vary
      .createBrowserSettingsFlow()
      .then((flow) => {
        // Update URI query params to include flow id
        setSearchParams({ ["flow"]: flow.id });
        // Set the flow data
        setFlow(flow);
      })
      .catch(sdkErrorHandler);
  };

  // submit any of the settings form data to Ory
  //   const onSubmit = (body: UpdateSettingsFlowBody) => {
  //     // something unexpected went wrong and the flow was not set
  //     if (!flow) return navigate("/settings", { replace: true })

  //     sdk
  //       // submit the form data the user provided to Ory
  //       .updateSettingsFlow({ flow: flow.id, updateSettingsFlowBody: body })
  //       .then((flow) => {
  //         setFlow(flow)
  //       })
  //       .catch(sdkErrorHandler)
  //   }

  useEffect(() => {
    // we might redirect to this page after the flow is initialized, so we check for the flowId in the URL
    const flowId = searchParams.get("flow");
    // the flow already exists
    if (flowId) {
      getFlow(flowId).catch(createFlow); // if for some reason the flow has expired, we need to get a new one
      return;
    }
    createFlow();
  }, []);

  if (!flow) return null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Settings flow={flow as any} config={config} />
    </div>
  );
}

export default AuthSettings;
