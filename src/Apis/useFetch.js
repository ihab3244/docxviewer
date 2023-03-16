import { useEffect, useState } from "react";
import { PushNotification, useMaterialUIController } from "../context/theme/themeContext";
import UI_STATUS from "../components/LodingProvider/UiStatus";

const useFetch = ({ loader, params, successCode, successMsg, errorMsg }) => {

  const [status, setStatus] = useState(UI_STATUS.LOADING)
  const [data, setData] = useState(null)
  const [controller, dispatch] = useMaterialUIController()

  const run = () => {
    loader(...params)
      .then(result => {
        if (result.status == successCode) {
          result.json().then(data => {
            setData(data)
          })
          setStatus(UI_STATUS.READY)
        } else {

            PushNotification(dispatch, errorMsg, 'error', 3000)


        }
        setStatus(UI_STATUS.READY)
      })
      .catch(e => {
        setStatus(UI_STATUS.ERROR)



      })
      .finally(() => {

      })
  }

  useEffect(() => {
    run()
  }, [loader])

  return { data, status };
};

export default useFetch
