import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CyanButton from '@components/CyanButton';
import InviteFriendPhoneInput from '@components/inviteScreensComponents/InviteFriendPhoneInput';
import InviteFriendService from '@services/invite-service';
import { AppDispatch, useAppDispatch } from '@store/store';
import { setAvailableInvitesCount } from '@features/InvitesSlice';
import { useSelector } from 'react-redux';
import { IState } from '@store/reducers';
import styles from './styles';

interface InviteModalProps {
  visible: boolean;
  onClose: () => void;
  modalType: 'SMS' | 'EMAIL';
}

const InviteModal: React.FC<InviteModalProps> = ({
  visible,
  onClose,
  modalType,
}) => {
  const dispatch: AppDispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const invitationCount = useSelector(
    (state: IState) => state?.invites?.availableInviteCount,
  );
  const uId = useSelector((state: IState) => state?.user?.profile?.uid);

  const handleServiceResponse = (
    response: boolean,
    successMessage: string,
  ) => {
    if (response) {
      Alert.alert('Success', successMessage);
      return true;
    }
    Alert.alert('Error', 'Something went wrong. Please try again later.');
    return false;
  };

  const sendEmail = async (mail: string) => {
    if (!uId) {
      Alert.alert('Error', 'Please login to send invites.');
      return false;
    }

    const response = await InviteFriendService.sendInvite(uId, mail);
    return handleServiceResponse(
      response,
      'Invite sent successfully via email.',
    );
  };

  const sendSMS = async (phone: string) => {
    if (phone.length === 0) {
      Alert.alert('Error', 'Please enter a valid phone number.');
      return false;
    }

    if (!uId) {
      Alert.alert('Error', 'Please login to send invites.');
      return false;
    }

    const response = await InviteFriendService.sendInvite(uId, phone);
    return handleServiceResponse(
      response,
      'Invite sent successfully via SMS.',
    );
  };

  const onButtonPress = async () => {
    setIsLoading(true);
    let success = false;

    if (modalType === 'SMS') {
      success = await sendSMS(phoneNumber);
    } else {
      success = await sendEmail(email);
    }

    if (success) {
      dispatch(setAvailableInvitesCount(invitationCount - 1));
      onClose();
    }

    setIsLoading(false);
  };

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.headerContainer}>
            <Text style={styles.modalText}>Invite Friend</Text>
          </View>
          <Text
            style={styles.descriptionText}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {modalType === 'EMAIL'
              ? 'Enter email address to invite them to Foode.'
              : 'Enter mobile number to invite them to Foode.'}
          </Text>
          {modalType === 'EMAIL' ? (
            <TextInput
              style={styles.input}
              onChangeText={text => setEmail(text)}
              value={email}
              keyboardType="default"
              autoCapitalize="none"
              placeholder="Email address"
            />
          ) : (
            <InviteFriendPhoneInput
              onPhoneNumberChange={phoneNum => {
                setPhoneNumber(phoneNum);
              }}
            />
          )}
          <CyanButton
            title="Send Invite"
            onPress={() => onButtonPress()}
            textStyle={styles.buttonText}
            disabled={isLoading}
          />
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>Never Mind</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default InviteModal;
