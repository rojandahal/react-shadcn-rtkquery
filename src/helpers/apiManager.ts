// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiCall = () => Promise<any>;

class ApiManager {
  private static instance: ApiManager;
  private lastApiCall: ApiCall | null = null;

  private constructor() {}

  static getInstance(): ApiManager {
    if (!ApiManager.instance) {
      ApiManager.instance = new ApiManager();
    }
    return ApiManager.instance;
  }

  setLastApiCall(apiCall: ApiCall) {
    this.lastApiCall = apiCall;
  }

  async recallLastApiCall() {
    if (this.lastApiCall) {
      try {
        return await this.lastApiCall();
      } catch (error) {
        console.error("Failed to recall last API call:", error);
      }
    } else {
      console.warn("No API call to recall.");
    }
  }
}

export const apiManager = ApiManager.getInstance();
