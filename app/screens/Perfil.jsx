import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Animated,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;
const numColumns = 3;
const imageSize = screenWidth / numColumns;

export default function UserProfileScreen() {
  const [isFollowing, setIsFollowing] = useState(false);
  const navigation = useNavigation();

  const user = {
    username: 'delbosquef1',
    posts: 6,
    followers: '367 mil',
  };

  const posts = [
    { id: '1', image: 'https://via.placeholder.com/300x300.png?text=Post+1' },
    { id: '2', image: 'https://via.placeholder.com/300x300.png?text=Post+2' },
    { id: '3', image: 'https://via.placeholder.com/300x300.png?text=Post+3' },
    { id: '4', image: 'https://via.placeholder.com/300x300.png?text=Post+4' },
    { id: '5', image: 'https://via.placeholder.com/300x300.png?text=Post+5' },
    { id: '6', image: 'https://via.placeholder.com/300x300.png?text=Post+6' },
  ];

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const renderItem = ({ item }) => {
    const scale = new Animated.Value(1);

    const onPressIn = () => {
      Animated.spring(scale, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const onPressOut = () => {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
        <Animated.View style={[styles.postContainer, { transform: [{ scale }] }]}>
          <Image source={{ uri: item.image }} style={styles.postImage} />
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: '#fff', fontSize: 13, fontWeight: 'bold' }}>
            Volver
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.username}>@{user.username}</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.posts}</Text>
          <Text style={styles.statLabel}>Publicaciones</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.followers}</Text>
          <Text style={styles.statLabel}>Seguidores</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.followButton, isFollowing ? styles.unfollow : styles.follow]}
        onPress={toggleFollow}
      >
        <Text style={styles.followText}>
          {isFollowing ? 'Siguiendo' : 'Seguir'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        style={styles.postGrid}
        scrollEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 60,
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  username: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#aaa',
    fontSize: 14,
  },
  followButton: {
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 20,
  },
  follow: {
    backgroundColor: '#1DA1F2',
  },
  unfollow: {
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#888',
  },
  followText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  postGrid: {
    width: '100%',
  },
  postContainer: {
    margin: 5,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#111',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  postImage: {
    width: imageSize - 10,
    height: imageSize - 10,
    borderRadius: 12,
  },
  
});
