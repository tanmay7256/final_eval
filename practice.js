const transformers = require('transformers')
const BeitFeatureExtractor = transformers.BeitFeatureExtractor
const BeitForImageClassification = transformers.BeitForImageClassification
 
from PIL import Image
import requests