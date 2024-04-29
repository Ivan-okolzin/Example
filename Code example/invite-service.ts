import axios from 'axios';
import auth from '@react-native-firebase/auth';
import Config from 'react-native-config';
import ErrorMessaging from '@utils/ErrorMessaging';

class InviteFriendService {
  inviteApiBaseUrl: string = Config.CLOUD_FUNCTIONS_URL;

  getAuthTokenOrThrow = async () => {
    const currentUser = auth().currentUser;

    if (!currentUser) throw new Error('No user for post service');

    const token = await currentUser.getIdToken();

    if (!token) throw new Error('No token for post service');

    return token;
  };

  public async sendInvite(uId: string, recipient: string): Promise<any> {
    try {
      const token = await this.getAuthTokenOrThrow();

      const url = `${this.inviteApiBaseUrl}/httpFns-waitlist-sendInvite`;

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const payload = {
        uId,
        recipient,
      };

      const { status, data } = await axios.post(url, payload, {
        headers,
      });

      if (status === 200) {
        return data;
      }

      ErrorMessaging.sendError('Error sending invite', {
        payload,
        status,
      });

      return false;
    } catch (error) {
      ErrorMessaging.sendError(error, 'sendInvite');

      return false;
    }
  }

  public async viewInvites(): Promise<any> {
    try {
      const token = await this.getAuthTokenOrThrow();

      const url = `${this.inviteApiBaseUrl}/httpFns-waitlist-viewInvites`;

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const { status, data } = await axios.get(url, {
        headers,
      });

      if (status === 200) {
        return data;
      }

      ErrorMessaging.sendError('Error retrieving invite data', {
        headers,
        status,
      });

      return false;
    } catch (error) {
      ErrorMessaging.sendError(error, 'viewInvites');

      return false;
    }
  }

  public async redeemInvite(inviteCode: string): Promise<any> {
    try {
      const url = `${this.inviteApiBaseUrl}/httpFns-waitlist-redeemInvite`;

      const headers = {
        'Content-Type': 'application/json',
      };

      const payload = {
        inviteCode,
      };

      const { status, data } = await axios.post(url, payload, {
        headers,
      });

      if (status === 200) {
        return data;
      }

      ErrorMessaging.sendError('Error redeeming invite', {
        payload,
        status,
      });

      return false;
    } catch (error) {
      ErrorMessaging.sendError(error, 'redeemInvite');

      return false;
    }
  }

  public async joinWaitlist(recipientEmail: string): Promise<any> {
    try {
      const url = `${this.inviteApiBaseUrl}/httpFns-waitlist-joinWaitlist`;

      const headers = {
        'Content-Type': 'application/json',
      };

      const payload = {
        recipientEmail,
      };

      const { status, data } = await axios.post(url, payload, {
        headers,
      });

      if (status === 200) {
        return data;
      }

      ErrorMessaging.sendError('Error joining waitlist', {
        payload,
        status,
      });

      return false;
    } catch (error) {
      ErrorMessaging.sendError(error, 'joinWaitlist');

      return false;
    }
  }

}

export default new InviteFriendService();
