export const getCloudinaryIconLink = (uri: string) => {
  return "https://res.cloudinary.com/duxmjjxns/image/upload/t_portfolio_icon/" + uri
}

const codeLogo: { [ id: string ]: string } = {
  "CSS": "css3",
  "Go": "golang",
  "HTML": "html5",
  "Java": "java",
  "Javascript": "js",
  "Node.js": "node-js",
  "PHP": "php",
  "Python": "python",
  "React.js": "react",
  "Swift": "swift",
  "SwiftUI": "swift",
}

export const getCodeLogo = (lang: string) => {
  return codeLogo[ lang ] || null
}