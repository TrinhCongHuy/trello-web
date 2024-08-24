import axios from 'axios';
import { toast } from 'react-toastify';
import { handleLogoutApi, refreshTokenApi } from '~/apis';

const authorizedAxiosInstance = axios.create();
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10;
authorizedAxiosInstance.defaults.withCredentials = true;

// Cấu hình Interceptor cho yêu cầu
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    // Không cần thêm token vào header vì cookie đã được thiết lập với HttpOnly
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let refreshTokenPromise = null;

// Cấu hình Interceptor cho phản hồi
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      handleLogoutApi().then(() => {
        localStorage.removeItem('userInfo')

        // Sau khi logout thành công thì điều hướng đến trang login
        location.href = '/sign-in'
      })
    }

    const originalRequest = error.config;

    if (error.response?.status === 410 && originalRequest) {
      if (!refreshTokenPromise) {

        refreshTokenPromise = refreshTokenApi()
          .then((res) => {
            // console.log('Token refreshed successfully');
            return res.data.accessToken; // Không cần sử dụng accessToken ở client
          })
          .catch(async (_error) => {
            // Nếu có lỗi khi làm mới token, thực hiện logout
            await handleLogoutApi();
            location.href = '/sign-in';
            return Promise.reject(_error);
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }

      return refreshTokenPromise.then(() => {
        // Thực hiện lại yêu cầu gốc sau khi token được làm mới
        return authorizedAxiosInstance(originalRequest);
      });
    }

    if (error.response?.status !== 410) {
      toast.error(error.response?.data?.message || error?.message);
    }

    return Promise.reject(error);
  }
);

export default authorizedAxiosInstance;
