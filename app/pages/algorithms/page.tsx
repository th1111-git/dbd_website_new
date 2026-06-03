import ClientPage from './ClientPage'

export const metadata = {
  title: 'Algorithm Festival',
}

const presentations = [
  {
    title: "Secure Multiparty Computation",
    presenters: ["Krishna Agarwal", "Sehaj Ganjoo", "Pratham Gupta"],
    usernames: ["null", "gseha21", "Pratham_Gupta"],
    abstract: "Secure Multi-Party Computation (MPC) is a cryptographic paradigm that enables multiple parties to jointly compute a function over their private inputs without revealing those inputs to each other. We will delve into Yao's Millionaire Problem, cover Oblivious Transfer, an essential cryptographic primitive, and Garbled Circuits, a powerful tool for secure function evaluation. We will also explore the Diffie-Hellman key exchange protocol, which allows secure communication between parties over an insecure channel. Through these examples, the talk aims to provide a clear understanding of MPC's theoretical foundations and real-world applications, emphasizing privacy-preserving computation in various domains."
  },
  {
    title: "Optimal Resource Management With Online Decision Making Strategies",
    presenters: ["Mohar Kanti Biswas", "Omar Muhammad", "Rolla Siddharth Reddy"],
    usernames: ["null", "omar", "SidZRed"],
    abstract: "In a world where decisions must be made without knowing what lies ahead, the elegance of online algorithms comes to life. The Paging Problem is a classic example of this, where managing limited resources becomes a game against an adversary. In this talk, we explore how paging algorithms navigate this uncertainty, using the powerful framework of competitive analysis to measure their effectiveness. Many optimal deterministic and randomized algorithms would be discussed which provide great insights into the elegance of the problem. Another variant of the classic problem which is the weighted paging problem will also be analysed. This would provide a great insight into the real world decision making strategies and their applications along a wide range of domains."
  },
  {
    title: "From Monkeys to Markets: Harnessing Genetic Algorithms for Financial Forecasting",
    presenters: ["Saksham Agrawal", "Shivey Ravi Guttal"],
    usernames: ["null", "null"],
    abstract: "In A Random Walk Down Wall Street (1973), Burton Malkiel suggested that a blindfolded monkey picking stocks could rival expert-selected portfolios. While this critiques human stock-picking, Charles Darwin's theory of evolution proves highly effective in finance when applied through Genetic Algorithms (GAs). These algorithms, inspired by natural selection, optimize complex financial tasks like portfolio management and trading by adapting to changing market conditions. GAs offer a cutting edge, adaptive approach that could navigate the complexities of modern financial markets."
  },
  {
    title: "Shor's Algorithm",
    presenters: ["Adithya K Anil", "Om Prakash"],
    usernames: ["adithya.ka", "Om2005Prakash"],
    abstract: "Shor's algorithm is a quantum algorithm that efficiently factors large integers, a problem crucial to cryptography. It exploits quantum mechanics to perform prime factorization in polynomial time, significantly faster than classical algorithms like the general number field sieve. The algorithm leverages quantum parallelism and quantum Fourier transform to find the period of a function related to integer factorization. This period-finding step is critical for determining the prime factors. Shor's algorithm poses a potential threat to widely used cryptographic systems, such as RSA, which rely on the difficulty of factoring large numbers for security."
  },
  {
    title: "Dicing with Dice",
    presenters: ["Fredie George Robin", "Shyam Sundar M"],
    usernames: ["null", "null"],
    abstract: "MaxCut is a fundamental problem in combinatorial optimisation, it seeks to partition the graph's vertices into two distinct sets to maximise the number of edges between them. We will take a look at the Goemans-Williamson algorithm, a 0.878 approximation algorithm that uses Semidefinite Programming and a randomised rounding procedure. We will be focussing on the theoretical foundations of the algorithm and the methods involved in its analysis."
  },
  {
    title: "Efficient Register Allocation through Chaitin's Graph-Coloring Algorithm",
    presenters: ["Jithendra Rao Kasibhatla", "Keval Pithadiya"],
    usernames: ["null", "kevalp"],
    abstract: "Register allocation is a crucial optimization step in modern compilers, directly impacting the execution speed of generated code. Chaitin’s graph-coloring algorithm offers a powerful approach to register allocation by leveraging graph theory to assign variables to a limited number of physical registers efficiently. This will cover the principles of Chaitin’s method, including constructing the interference graph, applying graph-coloring heuristics, and handling spill code to optimize register usage, and share insights into how Chaitin’s algorithm balances the dual demands of speed and memory efficiency, achieving optimized register assignments across a range of practical applications in compiler design."
  },
  {
    title: "Spectral Clustering Algorithm",
    presenters: ["Gavish Bansal", "Kintan Saha"],
    usernames: ["null", "kintansaha"],
    abstract: "Spectral clustering is a powerful and widely used technique in machine learning and data analysis, particularly effective for identifying clusters in non-convex and irregularly shaped datasets. Unlike traditional methods like k-means, which rely on geometric distances, spectral clustering utilizes the eigenvalues and eigenvectors of a similarity matrix derived from the data. This allows for dimensionality reduction before applying standard clustering techniques. The theoretical foundation of spectral clustering is rooted in graph theory, specifically the use of Laplacian matrices and eigen-decomposition, making it a unique and highly effective alternative to other clustering algorithms."
  },
  {
    title: "Understanding Protein Behavior: The Power of MCMC Algorithms",
    presenters: ["Anirudh Gupta", "Susmit Roy"],
    usernames: ["Anirudh Gupta", "null"],
    abstract: "We will explore the use of Markov Chain Monte Carlo (MCMC) simulations and their applications in studying protein systems. This talk will highlight how MCMC algorithms assist in evaluating protein structures, modeling dynamic behavior, and improving molecular docking methods, ultimately providing deeper insights into the biological functions of proteins."
  },
  {
    title: "Monte Carlo Tree Search",
    presenters: ["Sahil Chaudhary", "R K Shishir"],
    usernames: ["sahilchaudhary", "rkshishir"],
    abstract: "Monte Carlo Tree Search (MCTS) is a heuristic search algorithm used in decision-making processes, especially in games like chess, Go, and other AI applications. It combines the precision of tree search with the power of random sampling by simulating numerous random game plays (rollouts) from each node and gradually expanding the tree. MCTS consists of four key steps: selection, expansion, simulation, and backpropagation. It balances exploration (trying less-visited moves) and exploitation (focusing on moves with better outcomes) through techniques like Upper Confidence Bound (UCB). MCTS is widely appreciated for its adaptability to complex decision problems without needing a domain-specific evaluation function."
  }
];

export default function AlgorithmsPage() {
  return <ClientPage presentations={presentations} />
}
