/**
 * MusicFree·Test — 模仿 MusicFree 风格的双页面测试 App
 * 页面 1：首页（歌曲列表）
 * 页面 2：播放页（歌曲详情 + 播放控制）
 * 纯状态切换实现，无第三方导航库依赖。
 */

import React, { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Song = {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
};

const SONGS: Song[] = [
  { id: 1, title: '漠河舞厅', artist: '柳爽', album: '漠河舞厅', duration: '04:35' },
  { id: 2, title: '起风了', artist: '买辣椒也用券', album: '起风了', duration: '04:47' },
  { id: 3, title: '孤勇者', artist: '陈奕迅', album: '孤勇者', duration: '03:50' },
  { id: 4, title: '夜曲', artist: '周杰伦', album: '十一月的萧邦', duration: '03:48' },
  { id: 5, title: '光年之外', artist: 'G.E.M. 邓紫棋', album: '新的心跳', duration: '03:44' },
];

const COLORS = {
  bg: '#101014',
  card: '#1b1b24',
  accent: '#a855f7',
  accentSoft: 'rgba(168,85,247,0.16)',
  text: '#f5f5f7',
  sub: '#8e8e93',
};

/* ---------------- Page 1: 首页 ---------------- */

function HomePage({
  onPlay,
}: {
  onPlay: (song: Song) => void;
}): React.JSX.Element {
  return (
    <View style={styles.page}>
      <Text style={styles.logo}>MusicFree</Text>
      <Text style={styles.logoSub}>· 双页面测试 App ·</Text>

      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔍</Text>
        <Text style={styles.searchPlaceholder}>搜索歌曲、歌手（测试不可用）</Text>
      </View>

      <Text style={styles.sectionTitle}>推荐歌曲</Text>
      <ScrollView
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 40 }}>
        {SONGS.map(song => (
          <Pressable
            key={song.id}
            style={({ pressed }) => [
              styles.songRow,
              pressed && styles.songRowPressed,
            ]}
            onPress={() => onPlay(song)}>
            <View style={styles.cover}>
              <Text style={styles.coverNote}>♪</Text>
            </View>
            <View style={styles.songMeta}>
              <Text style={styles.songTitle} numberOfLines={1}>
                {song.title}
              </Text>
              <Text style={styles.songArtist} numberOfLines={1}>
                {song.artist} - {song.album}
              </Text>
            </View>
            <Text style={styles.songDuration}>{song.duration}</Text>
            <Text style={styles.playArrow}>▶</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

/* ---------------- Page 2: 播放页 ---------------- */

function PlayerPage({
  song,
  onBack,
}: {
  song: Song;
  onBack: () => void;
}): React.JSX.Element {
  const [playing, setPlaying] = useState(false);

  return (
    <View style={styles.page}>
      <View style={styles.playerTopBar}>
        <Pressable style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backText}>← 返回</Text>
        </Pressable>
        <Text style={styles.playerTopTitle}>正在播放</Text>
        <Text style={styles.playerTopTitle}>·</Text>
      </View>

      <View style={styles.playerCenter}>
        <View style={styles.bigCover}>
          <Text style={styles.bigCoverNote}>♪</Text>
        </View>
        <Text style={styles.bigTitle}>{song.title}</Text>
        <Text style={styles.bigArtist}>{song.artist}</Text>
        <Text style={styles.bigAlbum}>{song.album}</Text>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, playing ? { width: '62%' } : { width: '24%' }]} />
        </View>
        <View style={styles.progressTimes}>
          <Text style={styles.timeText}>{playing ? '02:41' : '01:12'}</Text>
          <Text style={styles.timeText}>{song.duration}</Text>
        </View>

        <View style={styles.controls}>
          <Pressable style={styles.ctrlBtn}>
            <Text style={styles.ctrlIcon}>⏮</Text>
          </Pressable>
          <Pressable
            style={[styles.ctrlBtnMain, playing && styles.ctrlBtnMainPlaying]}
            onPress={() => setPlaying(p => !p)}>
            <Text style={styles.ctrlIconMain}>{playing ? '⏸' : '▶'}</Text>
          </Pressable>
          <Pressable style={styles.ctrlBtn}>
            <Text style={styles.ctrlIcon}>⏭</Text>
          </Pressable>
        </View>

        <Text style={styles.playerHint}>
          {playing ? '♪ 播放中（模拟）' : '已暂停（模拟）'}
        </Text>
      </View>
    </View>
  );
}

/* ---------------- App 入口 ---------------- */

function App(): React.JSX.Element {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      {currentSong === null ? (
        <HomePage onPlay={setCurrentSong} />
      ) : (
        <PlayerPage song={currentSong} onBack={() => setCurrentSong(null)} />
      )}
    </SafeAreaView>
  );
}

/* ---------------- 样式 ---------------- */

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },
  page: { flex: 1 },

  /* 首页 */
  logo: {
    color: COLORS.accent,
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 18,
  },
  logoSub: {
    color: COLORS.sub,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 18,
    backgroundColor: COLORS.card,
    borderRadius: 22,
    paddingHorizontal: 16,
    height: 44,
  },
  searchIcon: { fontSize: 14, marginRight: 10 },
  searchPlaceholder: { color: COLORS.sub, fontSize: 14 },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  list: { flex: 1 },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  songRowPressed: { backgroundColor: COLORS.accentSoft },
  cover: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: COLORS.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverNote: { color: COLORS.accent, fontSize: 20 },
  songMeta: { flex: 1, marginHorizontal: 12 },
  songTitle: { color: COLORS.text, fontSize: 15, fontWeight: '600' },
  songArtist: { color: COLORS.sub, fontSize: 12, marginTop: 3 },
  songDuration: { color: COLORS.sub, fontSize: 12 },
  playArrow: {
    color: COLORS.accent,
    fontSize: 14,
    marginHorizontal: 10,
  },

  /* 播放页 */
  playerTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backBtn: { backgroundColor: 'transparent' },
  backText: { color: COLORS.accent, fontSize: 16, fontWeight: '600' },
  playerTopTitle: {
    color: COLORS.sub,
    fontSize: 13,
    marginHorizontal: 10,
  },
  playerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  bigCover: {
    width: 180,
    height: 180,
    borderRadius: 24,
    backgroundColor: COLORS.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  bigCoverNote: { color: COLORS.accent, fontSize: 72 },
  bigTitle: { color: COLORS.text, fontSize: 26, fontWeight: '800' },
  bigArtist: { color: COLORS.sub, fontSize: 16, marginTop: 6 },
  bigAlbum: { color: COLORS.sub, fontSize: 13, marginTop: 4 },
  progressTrack: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.12)',
    marginTop: 30,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: COLORS.accent },
  progressTimes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  timeText: { color: COLORS.sub, fontSize: 12 },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 26,
  },
  ctrlBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 14,
  },
  ctrlIcon: { fontSize: 22, color: COLORS.text },
  ctrlBtnMain: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctrlBtnMainPlaying: { backgroundColor: COLORS.accentSoft },
  ctrlIconMain: { fontSize: 28, color: COLORS.text },
  playerHint: {
    color: COLORS.sub,
    fontSize: 12,
    marginTop: 24,
  },
});

export default App;
