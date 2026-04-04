import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PROJECT_LESSONS } from "@/lib/lessons-data";

export default function ChatAppLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 mb-4">実践プロジェクト レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リアルタイムチャット</h1>
        <p className="text-gray-400">WebSocketで双方向通信のチャットアプリを作ろう</p>
      </div>

      {/* プロジェクト概要 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">プロジェクト概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-indigo-400">WebSocket</strong>を使って、複数のユーザーがリアルタイムに
          メッセージをやり取りできるチャットアプリケーションを構築します。
          HTTPのリクエスト・レスポンスモデルとは異なる、双方向通信の仕組みを学びます。
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-indigo-400 mb-2">技術スタック</h3>
            <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
              <li>Node.js + Express</li>
              <li>Socket.IO（WebSocketライブラリ）</li>
              <li>React（フロントエンド）</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-indigo-400 mb-2">実装する機能</h3>
            <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
              <li>リアルタイムメッセージ送受信</li>
              <li>ユーザー名の設定</li>
              <li>接続中ユーザーの表示</li>
              <li>タイピングインジケーター</li>
            </ul>
          </div>
        </div>
      </section>

      {/* WebSocketの基本 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">WebSocketとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          HTTP通信では、クライアントがリクエストを送り、サーバーがレスポンスを返す一方向の通信です。
          <strong className="text-indigo-400">WebSocket</strong>は、一度接続を確立すると
          クライアントとサーバーが自由にデータをやり取りできる<strong className="text-indigo-400">双方向通信</strong>を実現します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`HTTP通信:
  クライアント → リクエスト → サーバー
  クライアント ← レスポンス ← サーバー
  （毎回接続を張り直す）

WebSocket通信:
  クライアント ←→ サーバー
  （一度接続したら双方向にデータを送れる）
  サーバーからクライアントに自発的にデータを送信可能`}</code>
        </pre>
      </section>

      {/* サーバー側の実装 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ステップ1: サーバー側の実装（Socket.IO）</h2>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// server.js
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
});

// 接続中のユーザーを管理
const users = new Map();

io.on("connection", (socket) => {
  console.log("ユーザーが接続:", socket.id);

  // ユーザー名の登録
  socket.on("join", (username) => {
    users.set(socket.id, username);
    // 全員に通知
    io.emit("userList", Array.from(users.values()));
    io.emit("system", username + " が参加しました");
  });

  // メッセージの送受信
  socket.on("message", (data) => {
    io.emit("message", {
      id: Date.now(),
      user: users.get(socket.id),
      text: data.text,
      timestamp: new Date().toISOString(),
    });
  });

  // タイピング通知
  socket.on("typing", () => {
    socket.broadcast.emit("typing", users.get(socket.id));
  });

  socket.on("stopTyping", () => {
    socket.broadcast.emit("stopTyping", users.get(socket.id));
  });

  // 切断時
  socket.on("disconnect", () => {
    const username = users.get(socket.id);
    users.delete(socket.id);
    io.emit("userList", Array.from(users.values()));
    if (username) {
      io.emit("system", username + " が退出しました");
    }
  });
});

server.listen(4000, () => {
  console.log("チャットサーバー起動: http://localhost:4000");
});`}</code>
        </pre>
      </section>

      {/* クライアント側の実装 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ステップ2: クライアント側の実装（React）</h2>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// hooks/useChat.ts
"use client";

import { useEffect, useState, useCallback } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export function useChat(username) {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUser, setTypingUser] = useState(null);

  useEffect(() => {
    // ユーザー参加
    socket.emit("join", username);

    // メッセージ受信
    socket.on("message", (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    // システムメッセージ
    socket.on("system", (text) => {
      setMessages(prev => [...prev, { id: Date.now(), system: true, text }]);
    });

    // ユーザーリスト更新
    socket.on("userList", setUsers);

    // タイピング表示
    socket.on("typing", setTypingUser);
    socket.on("stopTyping", () => setTypingUser(null));

    return () => {
      socket.off("message");
      socket.off("system");
      socket.off("userList");
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [username]);

  const sendMessage = useCallback((text) => {
    socket.emit("message", { text });
  }, []);

  const startTyping = useCallback(() => {
    socket.emit("typing");
  }, []);

  const stopTyping = useCallback(() => {
    socket.emit("stopTyping");
  }, []);

  return { messages, users, typingUser, sendMessage, startTyping, stopTyping };
}`}</code>
        </pre>
      </section>

      {/* チャットUI */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ステップ3: チャットUIの実装</h2>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// components/ChatRoom.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@/hooks/useChat";

export function ChatRoom({ username }) {
  const { messages, users, typingUser, sendMessage, startTyping, stopTyping } = useChat(username);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const typingTimeout = useRef(null);

  // 自動スクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput("");
    stopTyping();
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    startTyping();
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(stopTyping, 1000);
  };

  return (
    <div className="flex h-screen">
      {/* ユーザーリスト */}
      <aside className="w-48 bg-gray-900 border-r border-gray-800 p-4">
        <h2 className="font-bold text-sm mb-3">接続中 ({users.length})</h2>
        {users.map(u => (
          <div key={u} className="text-sm text-gray-400 py-1">{u}</div>
        ))}
      </aside>

      {/* メッセージエリア */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map(msg => (
            <div key={msg.id} className={msg.system ? "text-center text-gray-500 text-sm" : ""}>
              {msg.system ? msg.text : (
                <div>
                  <span className="font-bold text-indigo-400">{msg.user}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                  <p className="text-gray-300">{msg.text}</p>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {typingUser && (
          <p className="px-4 text-sm text-gray-500">{typingUser} が入力中...</p>
        )}

        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800 flex gap-2">
          <input
            value={input}
            onChange={handleInput}
            placeholder="メッセージを入力..."
            className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700"
          />
          <button type="submit" className="px-6 py-2 bg-indigo-500 text-white rounded-lg">
            送信
          </button>
        </form>
      </div>
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>WebSocket は双方向通信を実現し、リアルタイムアプリに最適</li>
          <li>Socket.IO はWebSocketを簡単に扱えるライブラリ（自動再接続等）</li>
          <li>サーバーで接続管理、メッセージのブロードキャストを行う</li>
          <li>React の useEffect でイベントリスナーを管理し、クリーンアップを忘れない</li>
          <li>タイピングインジケーターはタイムアウトで自動停止する</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="project" lessonId="chat-app" color="blue" />
      <LessonNav lessons={PROJECT_LESSONS} currentId="chat-app" basePath="/learn/project" color="blue" />
    </div>
  );
}
