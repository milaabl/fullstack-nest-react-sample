export const getImage = (imagePath: string | undefined, defaultImg: any) => (imagePath ?
  `https://${process.env.REACT_APP_AWS_CONFIG_PICTURES_PATH}/${imagePath}` :
  defaultImg);
