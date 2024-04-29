import React, { ReactElement, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Header } from '@components/index';
import images from '@assets/images';
import InvitesLeftButton from '@components/inviteScreensComponents/InvitesLeftButton';
import ContactItem from '@components/ContactItem';
import InviteModal from '@components/SentInviteModal';
import { useSelector } from 'react-redux';
import { IState } from '@store/reducers';
import { DrawerStackScreenProps } from '@navigation/navigation-type';
import { NAVIGATION_ROUTES } from '@constants/common-constants';
import styles from './styles';

export interface Invite {
  inviteId: string;
  recipient: string;
  status: 'SENT' | 'REDEEMED';
}

export type InviteFriendScreenProps =
    DrawerStackScreenProps<typeof NAVIGATION_ROUTES.inviteFriendScreen>;

const InviteFriendScreen = (props: InviteFriendScreenProps): ReactElement => {
  const { navigation } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'SMS' | 'EMAIL'>('SMS');
  const invitationsCount = useSelector(
    (state: IState) => state.invites.availableInviteCount,
  );
  const invitations = useSelector(
    (state: IState) => state.invites.usedInvitesList,
  );

  return (
    <View style={styles.container}>
      <Header
        leftIcon={images.BackIcon}
        onLeftAction={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          You have {invitationsCount} invites left!
        </Text>
        <Text style={styles.description}>
          Invite your network of friends to Foode and share your
          favorite dining moments.
        </Text>
        <InvitesLeftButton
          invitationType="SMS"
          onPress={() => {
            setModalType('SMS');
            setModalVisible(true);
          }}
        />
        <InvitesLeftButton
          invitationType="EMAIL"
          onPress={() => {
            setModalType('EMAIL');
            setModalVisible(true);
          }}
        />
        <InviteModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          modalType={modalType}
        />
        <Text style={styles.listHeaderText}>Invitations</Text>
        <FlatList
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
          data={invitations}
          renderItem={({ item }) => (
            <ContactItem contact={item} key={item.inviteId} />
          )}
        />
      </View>
    </View>
  );
};

export default InviteFriendScreen;
