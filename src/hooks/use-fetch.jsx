import { useState } from "react";
import { useSession } from "@clerk/clerk-react";

export const useFetch = (cb, options = {}) => {
  const { session } = useSession();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const supabaseToken = await session.getToken({
        template: "supabase",
      });
      const response = await cb(supabaseToken, options, ...args);
      setData(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { fn, data, loading, error };
};
