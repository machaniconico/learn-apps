import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { INFRA_LESSONS } from "@/lib/lessons-data";

export default function KubernetesLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 mb-4">インフラ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Kubernetes入門</h1>
        <p className="text-gray-400">コンテナオーケストレーションの基本を学ぼう</p>
      </div>

      {/* コンテナオーケストレーションとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">コンテナオーケストレーションとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Dockerで作ったコンテナが増えてくると、「どのサーバーでどのコンテナを動かすか」「コンテナが
          落ちたら自動で再起動したい」「負荷に応じてスケールしたい」といった課題が出てきます。
          <strong className="text-cyan-400">Kubernetes（K8s）</strong>はこれらを自動化する
          コンテナオーケストレーションプラットフォームです。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`Kubernetes クラスターの構成：

┌─────────────────────────────────────────────────┐
│                  Control Plane                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │ API Server│ │ Scheduler│ │ Controller Manager│ │
│  └──────────┘ └──────────┘ └──────────────────┘ │
│  ┌──────────┐                                    │
│  │   etcd   │  ← クラスターの状態を保存          │
│  └──────────┘                                    │
└─────────────────────────────────────────────────┘

┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│   Worker Node  │  │   Worker Node  │  │   Worker Node  │
│  ┌───┐ ┌───┐  │  │  ┌───┐ ┌───┐  │  │  ┌───┐        │
│  │Pod│ │Pod│  │  │  │Pod│ │Pod│  │  │  │Pod│        │
│  └───┘ └───┘  │  │  └───┘ └───┘  │  │  └───┘        │
│  ┌─────────┐  │  │  ┌─────────┐  │  │  ┌─────────┐  │
│  │ kubelet │  │  │  │ kubelet │  │  │  │ kubelet │  │
│  └─────────┘  │  │  └─────────┘  │  │  └─────────┘  │
└───────────────┘  └───────────────┘  └───────────────┘`}</code>
        </pre>
      </section>

      {/* Pod */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Pod</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-cyan-400">Pod</strong>はKubernetesの最小デプロイ単位です。
          1つ以上のコンテナをまとめたもので、同じPod内のコンテナはネットワークとストレージを共有します。
          通常は1つのPodに1つのコンテナを配置します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# pod.yaml - 基本的なPod定義
apiVersion: v1
kind: Pod
metadata:
  name: my-app
  labels:
    app: my-app
spec:
  containers:
    - name: app
      image: node:20-alpine
      ports:
        - containerPort: 3000
      resources:
        requests:
          memory: "128Mi"
          cpu: "250m"
        limits:
          memory: "256Mi"
          cpu: "500m"
      env:
        - name: NODE_ENV
          value: "production"
        - name: PORT
          value: "3000"

# Podの作成
$ kubectl apply -f pod.yaml

# Podの確認
$ kubectl get pods
NAME     READY   STATUS    RESTARTS   AGE
my-app   1/1     Running   0          30s

# Podの詳細
$ kubectl describe pod my-app

# Podのログ
$ kubectl logs my-app

# Pod内でコマンドを実行
$ kubectl exec -it my-app -- /bin/sh`}</code>
        </pre>
      </section>

      {/* Deployment */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Deployment</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-cyan-400">Deployment</strong>はPodの宣言的な管理を行うリソースです。
          レプリカ数の維持、ローリングアップデート、ロールバックなどを自動で処理します。
          実運用ではPodを直接作らず、Deploymentを使います。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3    # 常に3つのPodを維持
  selector:
    matchLabels:
      app: my-app
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # 更新時に最大1つ追加
      maxUnavailable: 0  # 更新時にダウンするPodは0
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: app
          image: myregistry/my-app:v1.0.0
          ports:
            - containerPort: 3000
          readinessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 15
            periodSeconds: 20

# デプロイ
$ kubectl apply -f deployment.yaml

# Deploymentの確認
$ kubectl get deployments
NAME     READY   UP-TO-DATE   AVAILABLE   AGE
my-app   3/3     3            3           2m

# イメージの更新（ローリングアップデート）
$ kubectl set image deployment/my-app app=myregistry/my-app:v1.1.0

# ロールバック
$ kubectl rollout undo deployment/my-app

# 更新履歴の確認
$ kubectl rollout history deployment/my-app`}</code>
        </pre>
      </section>

      {/* Service */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Service</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-cyan-400">Service</strong>はPodへの安定したアクセスポイントを提供します。
          Podは動的にIPが変わりますが、Serviceは固定のアドレスでアクセスできます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  selector:
    app: my-app          # label が app=my-app のPodに振り分け
  type: ClusterIP        # クラスター内部からのみアクセス
  ports:
    - protocol: TCP
      port: 80           # Serviceのポート
      targetPort: 3000   # Podのポート

---
# 外部公開する場合（LoadBalancer）
apiVersion: v1
kind: Service
metadata:
  name: my-app-public
spec:
  selector:
    app: my-app
  type: LoadBalancer     # 外部ロードバランサーを作成
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000

---
# NodePort（開発・テスト用）
apiVersion: v1
kind: Service
metadata:
  name: my-app-nodeport
spec:
  selector:
    app: my-app
  type: NodePort
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
      nodePort: 30080    # ノードのIPでアクセス可能

# Serviceの確認
$ kubectl get services
NAME              TYPE          CLUSTER-IP     EXTERNAL-IP   PORT(S)
my-app-service    ClusterIP     10.96.0.100    <none>        80/TCP
my-app-public     LoadBalancer  10.96.0.101    203.0.113.1   80:31234/TCP`}</code>
        </pre>
      </section>

      {/* ConfigMap */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ConfigMap と Secret</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-cyan-400">ConfigMap</strong>は設定データを、
          <strong className="text-cyan-400">Secret</strong>は機密データを
          Podから分離して管理するリソースです。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  NODE_ENV: "production"
  LOG_LEVEL: "info"
  API_BASE_URL: "https://api.example.com"

---
# secret.yaml（値はbase64エンコード）
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
data:
  DATABASE_URL: cG9zdGdyZXM6Ly91c2VyOnBhc3NAZGIvbXlhcHA=
  API_KEY: c2VjcmV0LWFwaS1rZXktMTIzNDU=

# base64エンコード
$ echo -n 'postgres://user:pass@db/myapp' | base64

---
# Deploymentで使う
spec:
  containers:
    - name: app
      image: myregistry/my-app:v1.0.0
      envFrom:
        - configMapRef:
            name: app-config     # ConfigMapの全キーを環境変数に
        - secretRef:
            name: app-secrets    # Secretの全キーを環境変数に`}</code>
        </pre>
      </section>

      {/* kubectl基本操作とスケーリング */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">kubectlの基本操作とスケーリング</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-cyan-400">kubectl</strong>はKubernetesクラスターを操作するCLIツールです。
          リソースの作成、確認、更新、削除を行います。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# リソースの確認
$ kubectl get pods                    # Pod一覧
$ kubectl get pods -o wide            # 詳細情報（IPやノード）
$ kubectl get all                     # 全リソース
$ kubectl get pods -n my-namespace    # 名前空間を指定

# リソースの作成・更新
$ kubectl apply -f deployment.yaml    # YAMLから作成/更新
$ kubectl delete -f deployment.yaml   # YAMLのリソースを削除

# デバッグ
$ kubectl describe pod my-app-xxx     # 詳細情報とイベント
$ kubectl logs my-app-xxx             # ログを表示
$ kubectl logs -f my-app-xxx          # ログをリアルタイム表示
$ kubectl exec -it my-app-xxx -- sh   # コンテナ内にシェル接続`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# 手動スケーリング
$ kubectl scale deployment/my-app --replicas=5

# 自動スケーリング（HPA: Horizontal Pod Autoscaler）
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70   # CPU使用率70%を超えたらスケールアウト

# HPAの確認
$ kubectl get hpa
NAME         REFERENCE           TARGETS   MINPODS   MAXPODS   REPLICAS
my-app-hpa   Deployment/my-app   45%/70%   2         10        3`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Kubernetesはコンテナのデプロイ・スケーリング・管理を自動化するプラットフォーム</li>
          <li>Podはコンテナの最小デプロイ単位、Deploymentでレプリカ管理とローリングアップデートを行う</li>
          <li>ServiceはPodへの安定したアクセスポイント（ClusterIP、LoadBalancer、NodePort）</li>
          <li>ConfigMapとSecretで設定と機密情報をPodから分離して管理する</li>
          <li>kubectlでクラスターのリソースを操作・監視する</li>
          <li>HPAで負荷に応じた自動スケーリングが可能</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="infra" lessonId="kubernetes" color="cyan" />
      <LessonNav lessons={INFRA_LESSONS} currentId="kubernetes" basePath="/learn/infra" color="cyan" />
    </div>
  );
}
