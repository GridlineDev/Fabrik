"use client";

import { useState, useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';
import * as React from 'react';
import axios from 'axios';
import { ChevronLeft } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation'

export default function ProductCustomization({ params }) {
  const router = useRouter()
  const resolvedParams = React.use(params);
  const { productId } = resolvedParams;

  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('settings');
  const [backgroundType, setBackgroundType] = useState('product_image');
  const [isActive, setIsActive] = useState(false);
  const [elements, setElements] = useState([]);
  const [showAddElementModal, setShowAddElementModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pickingColor, setPickingColor] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const canvasRef = useRef(null);
  const pickerCanvasRef = useRef(null);

  useEffect(() => {
    const akronimFont = new FontFace('AkronimRegular', 'url(https://cdn.shopify.com/s/files/1/0930/5731/9226/files/Akronim-regular.ttf?v=1742551118)');
    const ALGERFont = new FontFace('ALGER', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/F2-ALGER.TTF?v=1744188424)');
    const AMAZBFont = new FontFace('AMAZB', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/F3-AMAZB.TTF?v=1744188424)');
    const ARLRDBDFont = new FontFace('ARLRDBD', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/F4-ARLRDBD.TTF?v=1744188424)');
    const BAHISSFont = new FontFace('BAHISS', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/F5-BAHISS.TTF?v=1744188424)');
    const BARWSSFont = new FontFace('BARWSS', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/F6-BARWSS.TTF?v=1744188424)');
    const BASOONNFont = new FontFace('BASOONN', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/F7-BASOONN.TTF?v=1744188424)');
    const BATAVINFont = new FontFace('BATAVIN', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/F8-BATAVIN.TTF?v=1744188424)');
    const BELLGOTHICSTDBLACKFont = new FontFace('BELLGOTHICSTD-BLACK', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/F10-BELLGOTHICSTD-BLACK.OTF?v=1744188424)');
    const BILLYOHIOFont = new FontFace('BILLY_OHIO', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/F11-BILLY_OHIO.OTF?v=1744188424)');
    const CASSHFont = new FontFace('CASSH', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/F13-CASSH.TTF?v=1744188424)');
    // 
    const AclonicaRegular = new FontFace('AclonicaRegular', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/01FTT-Aclonica-Regular.ttf?v=1746335251)');
    const BungeeInlineRegular = new FontFace('BungeeInlineRegular', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/02FTT-BungeeInline-Regular.ttf?v=1746335251)');
    const BungeeOutline = new FontFace('BungeeOutline', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/03FTT-BungeeOutline-Regular.ttf?v=1746335252)');
    const CaesarDressing = new FontFace('CaesarDressing', 'url( https://cdn.shopify.com/s/files/1/0748/9326/3091/files/04FTT-CaesarDressing-Regular.ttf?v=1746335251)');
    const CantoraOne = new FontFace('CantoraOne', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/05FTT-CantoraOne-Regular.ttf?v=1746335251)');
    const Capture = new FontFace('Capture', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/06FTT-Capture-it.ttf?v=1746335252)');
    const Carattere = new FontFace('Carattere', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/07FTT-Carattere-Regular.ttf?v=1746335251)');
    const Chomsky = new FontFace('Chomsky', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/08FTT-Chomsky.otf?v=1746335251)');
    const Cookie = new FontFace('Cookie', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/09FTT-Cookie-Regular.ttf?v=1746335251)');
    const CormorantUpright = new FontFace('CormorantUpright', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/10FTT-CormorantUpright-Bold.ttf?v=1746335252)');
    const DynaPuff = new FontFace('DynaPuff', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/11FTT-DynaPuff-VariableFont_wdth_wght.ttf?v=1746335252)');
    const VariableFont_wdth_wght = new FontFace('VariableFont_wdth_wght', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/11FTT-DynaPuff-VariableFont_wdth_wght.ttf?v=1746335252)');
    const FirecatMedium = new FontFace('FirecatMedium', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/12FTT-FirecatMedium.ttf?v=1746335251)');
    const FontdinerSwanky = new FontFace('FontdinerSwanky', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/13FTT-FontdinerSwanky-Regular.ttf?v=1746335251)');
    const FREEBSC = new FontFace('FREEBSC', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/14FTT-FREEBSC.ttf?v=1746335251)');
    const Gorditas = new FontFace('Gorditas', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/15FTT-Gorditas-Bold.ttf?v=1746335251)');
    const hilda = new FontFace('hilda', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/16FTT-hilda.otf?v=1746335251)');
    const Jellee = new FontFace('Jellee', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/17FTT-Jellee-Roman.otf?v=1746335251)');
    const SEASRN = new FontFace('SEASRN', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/18FTT-SEASRN.ttf?v=1746335251)');
    const Viga = new FontFace('Viga', 'url(https://cdn.shopify.com/s/files/1/0748/9326/3091/files/19FTT-Viga-Regular.ttf?v=1746335251)');


    // Create an array of font loading promises
    const fontPromises = [
      akronimFont.load(),
      ALGERFont.load(),
      AMAZBFont.load(),
      ARLRDBDFont.load(),
      BAHISSFont.load(),
      BARWSSFont.load(),
      BASOONNFont.load(),
      BATAVINFont.load(),
      BELLGOTHICSTDBLACKFont.load(),
      BILLYOHIOFont.load(),
      CASSHFont.load(),
      AclonicaRegular.load(),
      BungeeInlineRegular.load(),
      BungeeOutline.load(),
      CaesarDressing.load(),
      CantoraOne.load(),
      Capture.load(),
      Carattere.load(),
      Chomsky.load(),
      Cookie.load(),
      CormorantUpright.load(),
      DynaPuff.load(),
      VariableFont_wdth_wght.load(),
      FirecatMedium.load(),
      FontdinerSwanky.load(),
      FREEBSC.load(),
      Gorditas.load(),
      hilda.load(),
      Jellee.load(),
      SEASRN.load(),
      Viga.load(),
    ];

    // Load all fonts concurrently using Promise.all
    Promise.all(fontPromises)
      .then((loadedFonts) => {
        // Add the loaded fonts to the document
        loadedFonts.forEach((font) => document.fonts.add(font));
        console.log('All fonts loaded successfully');
      })
      .catch((error) => {
        console.error('Failed to load one or more fonts:', error);
      });
  }, [])

  // Fetch product and metafields
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/product?productId=${productId}`, {
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        console.log(data)
        if (data.product) {
          setProduct(data.product);
          const metafields = data.metafields || [];
          const customization = metafields.find(m => m.namespace === 'customization' && m.key === 'product_customization');
          if (customization) {
            const parsed = JSON.parse(customization.value);
            setBackgroundType(parsed.background_type || 'product_image');
            setIsActive(parsed.is_active === 'true');
            setElements(parsed.elements ? parsed.elements : []);
          }
        }
      } catch (err) {
        setError('Failed to load product');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  // Screen color picking
  useEffect(() => {
    if (pickingColor) {
      const canvas = pickerCanvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Capture screen
      html2canvas(document.body).then(screenCanvas => {
        ctx.drawImage(screenCanvas, 0, 0);
      });

      const handleClick = (e) => {
        const ctx = canvas.getContext('2d');
        const pixel = ctx.getImageData(e.clientX, e.clientY, 1, 1).data;
        const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
        const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);

        if (pickingColor.field === 'color') {
          updateElement(pickingColor.elementId, { color: hexColor });
        } else if (pickingColor.field === 'gradientStart') {
          updateElement(pickingColor.elementId, { gradientStart: hexColor });
        } else if (pickingColor.field === 'gradientEnd') {
          updateElement(pickingColor.elementId, { gradientEnd: hexColor });
        } else if (pickingColor.field === 'backgroundColor') {
          updateElement(pickingColor.elementId, { backgroundColor: hexColor });
        }
        setPickingColor(null);
      };

      window.addEventListener('click', handleClick);
      return () => window.removeEventListener('click', handleClick);
    }
  }, [pickingColor]);

  // Reset save status after a delay
  useEffect(() => {
    if (saveSuccess) {
      const timer = setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [saveSuccess]);

  // RGB to Hex conversion
  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  };

  // Add new element
  const addElement = () => {
    if (elements.length >= 1) {
      alert('Only one element is allowed');
      return;
    }
    const newElement = {
      id: `elem-${Date.now()}`,
      type: 'single_line_text',
      defaultValue: 'Sample Text',
      fontFamily: 'Arial',
      fontSize: 16,
      case: 'none',
      maxCharacters: 20,
      color: '#000000',
      colorMode: 'solid',
      gradientStart: '#000000',
      gradientEnd: '#ffffff',
      backgroundColor: 'transparent',
      position: { x: 50, y: 50 },
      size: { width: 200, height: 50 },
      rotation: 0,
    };
    setElements([newElement]);
    setShowAddElementModal(false);
  };

  // Update element properties
  const updateElement = (id, updates) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  // Remove element
  const removeElement = (id) => {
    setElements(elements.filter(el => el.id !== id));
  };

  // Save customization to Shopify metafields
  const saveCustomization = async () => {
    setSaving(true);
    try {
      const metafieldData = {
        metafield: {
          namespace: 'customization',
          key: 'product_customization',
          value: JSON.stringify({
            background_type: backgroundType,
            height: '400',
            width: '400',
            generate_preview: 'false',
            preview_size: '400x400',
            additional_file_format: 'PDF',
            default_font_family: 'Arial',
            elements: JSON.stringify(elements),
            is_active: isActive.toString(),
          }),
          type: 'json',
          productId
        },
      };

      const response = await axios.post('/api/metafields', metafieldData);

      // Check for successful response
      if (response.status >= 200 && response.status < 300) {
        setSaveSuccess(true);
      } else {
        throw new Error(response.data?.message || 'Failed to save customization');
      }
    } catch (err) {
      console.error("Error saving customization:", err);
      alert(`Failed to save customization: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  // Handle rotation
  const handleRotation = (element, e) => {
    e.stopPropagation();
    e.preventDefault();

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const elementRect = {
      left: element.position.x + canvasRect.left,
      top: element.position.y + canvasRect.top,
      width: element.size.width,
      height: element.size.height
    };

    const center = {
      x: elementRect.left + elementRect.width / 2,
      y: elementRect.top + elementRect.height / 2
    };

    const startAngle = Math.atan2(
      e.clientY - center.y,
      e.clientX - center.x
    ) * (180 / Math.PI);

    const initialRotation = element.rotation || 0;

    const onMouseMove = (ev) => {
      ev.preventDefault();
      const currentAngle = Math.atan2(
        ev.clientY - center.y,
        ev.clientX - center.x
      ) * (180 / Math.PI);

      let angleDiff = currentAngle - startAngle;
      // Normalize the angle to avoid jumping when crossing 180/-180
      if (angleDiff > 180) angleDiff -= 360;
      if (angleDiff < -180) angleDiff += 360;

      const newRotation = initialRotation + angleDiff;
      updateElement(element.id, { rotation: newRotation });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseUp);
  };

  const calculateFontSize = (text, width, height, initialSize) => {
    // Create a temporary span to measure text
    const span = document.createElement('span');
    span.style.visibility = 'hidden';
    span.style.position = 'absolute';
    span.style.whiteSpace = 'nowrap';
    span.style.fontSize = `${initialSize}px`;
    document.body.appendChild(span);

    // Set the text and measure its width
    span.innerText = text;
    const textWidth = span.offsetWidth;

    // Remove the temporary span
    document.body.removeChild(span);

    // If text fits, return initial size
    if (textWidth <= width) {
      return initialSize;
    }

    // Calculate new font size based on available width
    const ratio = width / textWidth;
    const newSize = Math.floor(initialSize * ratio * 0.9); // 0.9 for some padding

    // Ensure minimum font size
    return Math.max(newSize, 8);
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Product</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{product?.title || 'Product Customization'}</h1>
              <p className="text-gray-500 mt-1">Customize how customers personalize this product</p>
              <p onClick={() => router.push('/admin/products')} className='flex items-center text-blue-700 cursor-pointer'> <ChevronLeft /> Go Back</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center min-w-[120px]
                  ${saving ? 'bg-gray-400 cursor-not-allowed' : saveSuccess ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                onClick={saveCustomization}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : saveSuccess ? (
                  <>
                    <svg className="-ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Saved!
                  </>
                ) : (
                  'Save Customization'
                )}
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Customization Panel - Takes up 2/5 of the screen on large devices */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="flex border-b">
                <button
                  className={`flex-1 px-4 py-4 text-center font-medium transition-colors ${activeTab === 'settings' ? 'text-blue-600 border-b-2 border-blue-500 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'}`}
                  onClick={() => setActiveTab('settings')}
                >
                  Settings
                </button>
                <button
                  className={`flex-1 px-4 py-4 text-center font-medium transition-colors ${activeTab === 'elements' ? 'text-blue-600 border-b-2 border-blue-500 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'}`}
                  onClick={() => setActiveTab('elements')}
                >
                  Elements
                </button>
              </div>

              <div className="p-6">
                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-3">Background Type</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <label className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${backgroundType === 'product_image' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                          <input
                            type="radio"
                            name="backgroundType"
                            value="product_image"
                            checked={backgroundType === 'product_image'}
                            onChange={() => setBackgroundType('product_image')}
                            className="sr-only"
                          />
                          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <span className="text-gray-800 font-medium">Product Image</span>
                        </label>

                        <label className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${backgroundType === 'color' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                          <input
                            type="radio"
                            name="backgroundType"
                            value="color"
                            checked={backgroundType === 'color'}
                            onChange={() => setBackgroundType('color')}
                            className="sr-only"
                          />
                          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                            </svg>
                          </div>
                          <span className="text-gray-800 font-medium">Solid Color</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-3">Customization Status</h3>
                      <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-600 mb-1">Allow customers to customize this product</p>
                            <p className="text-sm text-gray-500">{isActive ? 'Customization is active and visible to customers' : 'Customization is inactive and hidden from customers'}</p>
                          </div>
                          <div>
                            <button
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isActive ? 'bg-green-500' : 'bg-gray-300'}`}
                              onClick={() => setIsActive(!isActive)}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-6' : 'translate-x-1'}`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'elements' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-medium text-gray-800">Text Elements</h3>
                      <button
                        className={`px-4 py-2 rounded-lg transition-colors 
                          ${elements.length >= 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}
                        onClick={() => elements.length < 1 && setShowAddElementModal(true)}
                        disabled={elements.length >= 1}
                      >
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Add Text
                        </div>
                      </button>
                    </div>

                    {elements.length === 0 ? (
                      <div className="bg-gray-50 rounded-lg border border-dashed border-gray-300 p-8 text-center">
                        <div className="flex justify-center mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h4 className="text-gray-700 font-medium mb-1">No elements added</h4>
                        <p className="text-gray-500 text-sm mb-4">Add a text element to allow customer customization</p>
                        <button
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          onClick={() => setShowAddElementModal(true)}
                        >
                          Add Your First Element
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        {elements.map(element => (
                          <div key={element.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                              <h4 className="font-medium text-gray-700">Text Element</h4>
                              <button
                                className="text-red-500 hover:text-red-700 transition-colors"
                                onClick={() => removeElement(element.id)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                            <div className="p-4 space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Default Text</label>
                                <input
                                  type="text"
                                  value={element.defaultValue}
                                  onChange={(e) => updateElement(element.id, { defaultValue: e.target.value })}
                                  className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Enter default text"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Text Case</label>
                                  <select
                                    value={element.case}
                                    onChange={(e) => updateElement(element.id, { case: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                                  >
                                    <option value="none">Normal Case</option>
                                    <option value="uppercase">UPPERCASE</option>
                                    <option value="lowercase">lowercase</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Characters</label>
                                  <input
                                    type="number"
                                    value={element.maxCharacters}
                                    onChange={(e) => updateElement(element.id, { maxCharacters: parseInt(e.target.value) || 0 })}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                                    min="1"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Font Family</label>
                                  <select
                                    value={element.fontFamily}
                                    onChange={(e) => updateElement(element.id, { fontFamily: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                                  >
                                    <option value="Arial">Arial</option>
                                    <option value="Helvetica">Helvetica</option>
                                    <option value="Times New Roman">Times New Roman</option>
                                    <option value="Courier New">Courier New</option>
                                    <option value="Verdana">Verdana</option>
                                    <option value="AkronimRegular">AkronimRegular</option>
                                    <option value="ALGER">ALGER</option>
                                    <option value="AMAZB">AMAZB</option>
                                    <option value="ARLRDBD">ARLRDBD</option>
                                    <option value="BAHISS">BAHISS</option>
                                    <option value="BARWSS">AkronimRegular</option>
                                    <option value="BASOONN">BASOONN</option>
                                    <option value="BATAVIN">AkronimRegular</option>
                                    <option value="BILLY_OHIO">BILLY_OHIO</option>
                                    <option value="BELLGOTHICSTD-BLACK">BELLGOTHICSTD-BLACK</option>
                                    <option value="CASSH">CASSH</option>
                                    <option value="AclonicaRegular">AclonicaRegular</option>
                                    <option value="BungeeInlineRegular">BungeeInlineRegular</option>
                                    <option value="BungeeOutline">BungeeOutline</option>
                                    <option value="CaesarDressing">CaesarDressing</option>
                                    <option value="CantoraOne">CantoraOne</option>
                                    <option value="Capture">Capture</option>
                                    <option value="Carattere">Carattere</option>
                                    <option value="Chomsky">Chomsky</option>
                                    <option value="Cookie">Cookie</option>
                                    <option value="CormorantUpright">CormorantUpright</option>
                                    <option value="DynaPuff">DynaPuff</option>
                                    <option value="VariableFont_wdth_wght">VariableFont_wdth_wght</option>
                                    <option value="FirecatMedium">FirecatMedium</option>
                                    <option value="FontdinerSwanky">FontdinerSwanky</option>
                                    <option value="FREEBSC">FREEBSC</option>
                                    <option value="Gorditas">Gorditas</option>
                                    <option value="hilda">hilda</option>
                                    <option value="Jellee">Jellee</option>
                                    <option value="SEASRN">SEASRN</option>
                                    <option value="Viga">Viga</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
                                  <div className="flex items-center">
                                    <input
                                      type="range"
                                      min="8"
                                      max="72"
                                      value={element.fontSize}
                                      onChange={(e) => updateElement(element.id, { fontSize: parseInt(e.target.value) })}
                                      className="w-full mr-2"
                                    />
                                    <span className="text-sm text-gray-600 w-8 text-center">{element.fontSize}</span>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Color Mode</label>
                                <div className="grid grid-cols-2 gap-4">
                                  <label className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all ${element.colorMode === 'solid' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                    <input
                                      type="radio"
                                      name={`colorMode-${element.id}`}
                                      value="solid"
                                      checked={element.colorMode === 'solid'}
                                      onChange={() => updateElement(element.id, { colorMode: 'solid' })}
                                      className="sr-only"
                                    />
                                    <span className="text-gray-800">Solid Color</span>
                                  </label>

                                  <label className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all ${element.colorMode === 'gradient' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                    <input
                                      type="radio"
                                      name={`colorMode-${element.id}`}
                                      value="gradient"
                                      checked={element.colorMode === 'gradient'}
                                      onChange={() => updateElement(element.id, { colorMode: 'gradient' })}
                                      className="sr-only"
                                    />
                                    <span className="text-gray-800">Gradient</span>
                                  </label>
                                </div>
                              </div>

                              {element.colorMode === 'solid' ? (
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
                                  <div className="flex items-center gap-3">
                                    <div
                                      className="w-10 h-10 rounded border cursor-pointer"
                                      style={{ backgroundColor: element.color }}
                                      onClick={() => {/* Color picker logic */ }}
                                    ></div>
                                    <input
                                      type="color"
                                      value={element.color}
                                      onChange={(e) => updateElement(element.id, { color: e.target.value })}
                                      className="sr-only -mt-96"
                                      id={`color-${element.id}`}
                                    />
                                    <label htmlFor={`color-${element.id}`} className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm text-gray-700 transition-colors">
                                      Choose
                                    </label>
                                    <span className="text-sm text-gray-500">{element.color}</span>
                                  </div>
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Gradient Start</label>
                                    <div className="flex items-center gap-3">
                                      <div
                                        className="w-10 h-10 rounded border cursor-pointer"
                                        style={{ backgroundColor: element.gradientStart }}
                                        onClick={() => {/* Color picker logic */ }}
                                      ></div>
                                      <input
                                        type="color"
                                        value={element.gradientStart}
                                        onChange={(e) => updateElement(element.id, { gradientStart: e.target.value })}
                                        className="sr-only -mt-96"
                                        id={`gradientStart-${element.id}`}
                                      />
                                      <label htmlFor={`gradientStart-${element.id}`} className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm text-gray-700 transition-colors">
                                        Choose
                                      </label>
                                      <span className="text-sm text-gray-500">{element.gradientStart}</span>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Gradient End</label>
                                    <div className="flex items-center gap-3">
                                      <div
                                        className="w-10 h-10 rounded border cursor-pointer"
                                        style={{ backgroundColor: element.gradientEnd }}
                                        onClick={() => {/* Color picker logic */ }}
                                      ></div>
                                      <input
                                        type="color"
                                        value={element.gradientEnd}
                                        onChange={(e) => updateElement(element.id, { gradientEnd: e.target.value })}
                                        className="sr-only -mt-96"
                                        id={`gradientEnd-${element.id}`}
                                      />
                                      <label htmlFor={`gradientEnd-${element.id}`} className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm text-gray-700 transition-colors">
                                        Choose
                                      </label>
                                      <span className="text-sm text-gray-500">{element.gradientEnd}</span>
                                    </div>
                                  </div>
                                </div>
                              )}

                              <div className="pt-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded border relative" style={{ backgroundColor: element.backgroundColor }}>
                                    {element.backgroundColor === 'transparent' && (
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                      </div>
                                    )}
                                  </div>
                                  <input
                                    type="color"
                                    value={element.backgroundColor}
                                    onChange={(e) => updateElement(element.id, { backgroundColor: e.target.value })}
                                    className="sr-only -mt-96"
                                    id={`bgColor-${element.id}`}
                                  />
                                  <label htmlFor={`bgColor-${element.id}`} className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm text-gray-700 transition-colors">
                                    Choose
                                  </label>
                                  <button
                                    className="text-sm text-blue-500 hover:text-blue-700 transition-colors"
                                    onClick={() => updateElement(element.id, { backgroundColor: 'transparent' })}
                                  >
                                    Set Transparent
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preview Panel - Takes up 3/5 of the screen on large devices */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-medium text-gray-800">Live Preview</h2>
                <p className="text-gray-500 text-sm mt-1">
                  Drag, resize, or rotate elements to position them on the product
                </p>
              </div>

              <div className="p-6">
                <div className="flex justify-center">
                  <div
                    className="relative w-full max-w-[400px] h-[400px] border border-gray-200 rounded-lg overflow-hidden shadow-inner bg-white"
                    ref={canvasRef}
                  >
                    {/* Background */}
                    {backgroundType === 'product_image' && product?.images?.[0]?.src ? (
                      <img
                        src={product.images[0].src}
                        alt="Product background"
                        className="absolute inset-0 w-full h-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_189b8e9e4e2%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A20pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_189b8e9e4e2%22%3E%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22147.5%22%20y%3D%22218.1%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-white"></div>
                    )}

                    {/* Elements */}
                    {elements.map(element => (
                      <Rnd
                        key={element.id}
                        size={{ width: element.size.width, height: element.size.height }}
                        position={{ x: element.position.x, y: element.position.y }}
                        onDragStop={(e, d) => updateElement(element.id, { position: { x: d.x, y: d.y } })}
                        onResizeStop={(e, direction, ref, delta, position) => {
                          updateElement(element.id, {
                            size: { width: ref.offsetWidth, height: ref.offsetHeight },
                            position,
                          });
                        }}
                        style={{
                          transform: `rotate(${element.rotation}deg)`,
                          border: '1px dashed #4a90e2',
                          backgroundColor: element.backgroundColor === 'transparent' ? 'rgba(255,255,255,0.7)' : element.backgroundColor,
                        }}
                        bounds="parent"
                        enableResizing={{
                          top: true,
                          right: true,
                          bottom: true,
                          left: true,
                          topRight: true,
                          bottomRight: true,
                          bottomLeft: true,
                          topLeft: true,
                        }}
                      >
                        <div
                          style={{
                            fontFamily: element.fontFamily,
                            fontSize: `${calculateFontSize(
                              element.defaultValue,
                              element.size.width - 8, // Subtract padding
                              element.size.height - 8,
                              element.fontSize
                            )}px`,
                            color: element.colorMode === 'solid' ? element.color : 'transparent',
                            backgroundImage: element.colorMode === 'gradient'
                              ? `linear-gradient(to right, ${element.gradientStart}, ${element.gradientEnd})`
                              : 'none',
                            WebkitBackgroundClip: element.colorMode === 'gradient' ? 'text' : 'none',
                            backgroundClip: element.colorMode === 'gradient' ? 'text' : 'none',
                            textTransform: element.case,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'move',
                            position: 'relative',
                            padding: '4px',
                            boxSizing: 'border-box',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {element.defaultValue}
                          <div
                            style={{
                              position: 'absolute',
                              top: -20,
                              right: -20,
                              width: 24,
                              height: 24,
                              background: '#4a90e2',
                              borderRadius: '50%',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: '14px',
                              userSelect: 'none',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                            }}
                            onMouseDown={(e) => handleRotation(element, e)}
                          >
                            ↻
                          </div>
                        </div>
                      </Rnd>
                    ))}

                    {/* Empty state hint */}
                    {elements.length === 0 && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <h3 className="text-gray-600 font-medium">No Elements Added</h3>
                        <p className="text-gray-400 text-sm mt-1">Add an element from the panel to customize</p>
                      </div>
                    )}
                  </div>
                </div>

                {elements.length > 0 && (
                  <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <h3 className="text-blue-700 font-medium flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Editor Tips
                    </h3>
                    <ul className="mt-2 text-sm text-blue-600 space-y-1">
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Click and drag to reposition the element
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Drag the corner handles to resize
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Product Info Panel */}
            <div className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-medium text-gray-800">Product Information</h2>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row">
                  <div className="w-24 h-24 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center overflow-hidden mb-4 md:mb-0 md:mr-4">
                    {product?.images?.[0]?.src ? (
                      <img src={product.images[0].src} alt={product.title} className="w-full h-full object-contain" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-gray-800">{product?.title || 'Product Title'}</h3>
                    <p className="text-gray-500 text-sm mt-1">{product?.product_type || 'Product Type'}</p>
                    <div className="mt-2 space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {isActive ? 'Customization Active' : 'Customization Inactive'}
                      </span>
                      {product?.status && (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.status === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                          {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Element Modal */}
      {showAddElementModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Add New Element</h2>
              <button
                className="text-gray-500 hover:text-gray-700 transition-colors"
                onClick={() => setShowAddElementModal(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Element Type</label>
              <div className="grid grid-cols-1 gap-3">
                <label className="relative flex items-center p-3 rounded-lg border-2 border-blue-500 bg-blue-50 cursor-pointer">
                  <input type="radio" name="elementType" value="single_line_text" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 mr-3" />
                  <div>
                    <span className="block text-sm font-medium text-gray-900">
                      Single Line Text
                    </span>
                    <span className="block text-xs text-gray-500">
                      Add customizable text that appears on a single line
                    </span>
                  </div>
                </label>

                <label className="relative flex items-center p-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed">
                  <input type="radio" name="elementType" value="multi_line_text" disabled className="h-4 w-4 text-gray-400 mr-3" />
                  <div>
                    <div className="flex items-center">
                      <span className="block text-sm font-medium">
                        Multi Line Text
                      </span>
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        Coming Soon
                      </span>
                    </div>
                    <span className="block text-xs">
                      Add customizable text that can span multiple lines
                    </span>
                  </div>
                </label>

                <label className="relative flex items-center p-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed">
                  <input type="radio" name="elementType" value="image" disabled className="h-4 w-4 text-gray-400 mr-3" />
                  <div>
                    <div className="flex items-center">
                      <span className="block text-sm font-medium">
                        Image Upload
                      </span>
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        Coming Soon
                      </span>
                    </div>
                    <span className="block text-xs">
                      Allow customers to upload their own images
                    </span>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                onClick={() => setShowAddElementModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={addElement}
              >
                Add Element
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Color Picker Canvas */}
      {pickingColor && (
        <canvas
          ref={pickerCanvasRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            cursor: 'crosshair',
            zIndex: 9999,
          }}
        />
      )}
    </div>
  );
}




// "use client";

// import { useState, useEffect, useRef } from 'react';
// import { Rnd } from 'react-rnd';
// import * as React from 'react';
// import axios from 'axios';

// export default function ProductCustomization({ params }) {
//   const resolvedParams = React.use(params);
//   const { productId } = resolvedParams;

//   const [product, setProduct] = useState(null);
//   const [activeTab, setActiveTab] = useState('settings');
//   const [backgroundType, setBackgroundType] = useState('product_image');
//   const [isActive, setIsActive] = useState(false);
//   const [elements, setElements] = useState([]);
//   const [showAddElementModal, setShowAddElementModal] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pickingColor, setPickingColor] = useState(null);
//   const canvasRef = useRef(null);
//   const pickerCanvasRef = useRef(null);

//   // Fetch product and metafields
//   useEffect(() => {
//     const fetchProduct = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`/api/product?productId=${productId}`, {
//           headers: { 'Content-Type': 'application/json' },
//         });
//         const data = await response.json();
//         if (data.product) {
//           setProduct(data.product);
//           const metafields = data.metafields || [];
//           const customization = metafields.find(m => m.namespace === 'customization' && m.key === 'product_customization');
//           if (customization) {
//             const parsed = JSON.parse(customization.value);
//             setBackgroundType(parsed.background_type || 'product_image');
//             setIsActive(parsed.is_active === 'true');
//             setElements(parsed.elements ? JSON.parse(parsed.elements) : []);
//           }
//         }
//       } catch (err) {
//         setError('Failed to load product');
//         console.error('Error fetching product:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [productId]);

//   // Screen color picking
//   useEffect(() => {
//     if (pickingColor) {
//       const canvas = pickerCanvasRef.current;
//       const ctx = canvas.getContext('2d');
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;

//       // Capture screen
//       html2canvas(document.body).then(screenCanvas => {
//         ctx.drawImage(screenCanvas, 0, 0);
//       });

//       const handleClick = (e) => {
//         const ctx = canvas.getContext('2d');
//         const pixel = ctx.getImageData(e.clientX, e.clientY, 1, 1).data;
//         const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
//         const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);

//         if (pickingColor.field === 'color') {
//           updateElement(pickingColor.elementId, { color: hexColor });
//         } else if (pickingColor.field === 'gradientStart') {
//           updateElement(pickingColor.elementId, { gradientStart: hexColor });
//         } else if (pickingColor.field === 'gradientEnd') {
//           updateElement(pickingColor.elementId, { gradientEnd: hexColor });
//         } else if (pickingColor.field === 'backgroundColor') {
//           updateElement(pickingColor.elementId, { backgroundColor: hexColor });
//         }
//         setPickingColor(null);
//       };

//       window.addEventListener('click', handleClick);
//       return () => window.removeEventListener('click', handleClick);
//     }
//   }, [pickingColor]);

//   // RGB to Hex conversion
//   const rgbToHex = (r, g, b) => {
//     return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
//   };

//   // Add new element
//   const addElement = () => {
//     if (elements.length >= 1) {
//       alert('Only one element is allowed');
//       return;
//     }
//     const newElement = {
//       id: `elem-${Date.now()}`,
//       type: 'single_line_text',
//       defaultValue: 'Sample Text',
//       fontFamily: 'Arial',
//       fontSize: 16,
//       case: 'none',
//       maxCharacters: 20,
//       color: '#000000',
//       colorMode: 'solid',
//       gradientStart: '#000000',
//       gradientEnd: '#ffffff',
//       backgroundColor: 'transparent',
//       position: { x: 50, y: 50 },
//       size: { width: 200, height: 50 },
//       rotation: 0,
//     };
//     setElements([newElement]);
//     setShowAddElementModal(false);
//   };

//   // Update element properties
//   const updateElement = (id, updates) => {
//     setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el));
//   };

//   // Remove element
//   const removeElement = (id) => {
//     setElements(elements.filter(el => el.id !== id));
//   };

//   // Save customization to Shopify metafields
//   const saveCustomization = async () => {
//     try {
//       const metafieldData = {
//         metafield: {
//           namespace: 'customization',
//           key: 'product_customization',
//           value: JSON.stringify({
//             background_type: backgroundType,
//             height: '400',
//             width: '400',
//             generate_preview: 'false',
//             preview_size: '400x400',
//             additional_file_format: 'PDF',
//             default_font_family: 'Arial',
//             elements: JSON.stringify(elements),
//             is_active: isActive.toString(),
//           }),
//           type: 'json',
//           productId
//         },
//       };

//       const response = await axios.post('/api/metafields', metafieldData);

//       // Check for successful response
//       if (response.status >= 200 && response.status < 300) {
//         alert('Customization saved successfully');
//       } else {
//         throw new Error(response.data?.message || 'Failed to save customization');
//       }
//     } catch (err) {
//       console.error("Error saving customization:", err);
//       alert(`Failed to save customization: ${err.message}`);
//     }
//   };

//   // Handle rotation
//   const handleRotation = (element, e) => {
//     e.stopPropagation();
//     e.preventDefault();

//     const canvasRect = canvasRef.current.getBoundingClientRect();
//     const elementRect = {
//       left: element.position.x + canvasRect.left,
//       top: element.position.y + canvasRect.top,
//       width: element.size.width,
//       height: element.size.height
//     };

//     const center = {
//       x: elementRect.left + elementRect.width / 2,
//       y: elementRect.top + elementRect.height / 2
//     };

//     const startAngle = Math.atan2(
//       e.clientY - center.y,
//       e.clientX - center.x
//     ) * (180 / Math.PI);

//     const initialRotation = element.rotation || 0;

//     const onMouseMove = (ev) => {
//       ev.preventDefault();
//       const currentAngle = Math.atan2(
//         ev.clientY - center.y,
//         ev.clientX - center.x
//       ) * (180 / Math.PI);

//       let angleDiff = currentAngle - startAngle;
//       // Normalize the angle to avoid jumping when crossing 180/-180
//       if (angleDiff > 180) angleDiff -= 360;
//       if (angleDiff < -180) angleDiff += 360;

//       const newRotation = initialRotation + angleDiff;
//       updateElement(element.id, { rotation: newRotation });
//     };

//     const onMouseUp = () => {
//       document.removeEventListener('mousemove', onMouseMove);
//       document.removeEventListener('mouseup', onMouseUp);
//       document.removeEventListener('mouseleave', onMouseUp);
//     };

//     document.addEventListener('mousemove', onMouseMove);
//     document.addEventListener('mouseup', onMouseUp);
//     document.addEventListener('mouseleave', onMouseUp);
//   };

//   if (loading) return <div className="p-4">Loading...</div>;
//   if (error) return <div className="p-4 text-red-500">{error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">{product?.title || 'Product Customization'}</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Customization Panel */}
//         <div className="bg-white p-4 shadow rounded">
//           <div className="flex border-b mb-4">
//             <button
//               className={`px-4 py-2 ${activeTab === 'settings' ? 'border-b-2 border-blue-500' : ''}`}
//               onClick={() => setActiveTab('settings')}
//             >
//               Settings
//             </button>
//             <button
//               className={`px-4 py-2 ${activeTab === 'elements' ? 'border-b-2 border-blue-500' : ''}`}
//               onClick={() => setActiveTab('elements')}
//             >
//               Elements
//             </button>
//           </div>

//           {activeTab === 'settings' && (
//             <div>
//               <div className="mb-4">
//                 <label className="block mb-2">Background Type</label>
//                 <div className="space-y-2">
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="backgroundType"
//                       value="product_image"
//                       checked={backgroundType === 'product_image'}
//                       onChange={() => setBackgroundType('product_image')}
//                       className="mr-2"
//                     />
//                     Product Image
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="backgroundType"
//                       value="color"
//                       checked={backgroundType === 'color'}
//                       onChange={() => setBackgroundType('color')}
//                       className="mr-2"
//                     />
//                     Solid Color
//                   </label>
//                 </div>
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2">Status</label>
//                 <button
//                   className={`px-4 py-2 rounded ${isActive ? 'bg-green-500' : 'bg-red-500'} text-white`}
//                   onClick={() => setIsActive(!isActive)}
//                 >
//                   {isActive ? 'Active' : 'Inactive'}
//                 </button>
//               </div>
//             </div>
//           )}

//           {activeTab === 'elements' && (
//             <div>
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//                 onClick={() => setShowAddElementModal(true)}
//               >
//                 Add Element
//               </button>
//               {elements.map(element => (
//                 <div key={element.id} className="border p-4 mb-4 rounded">
//                   <div className="flex justify-between mb-2">
//                     <h3 className="font-bold">Text Element</h3>
//                     <button
//                       className="text-red-500"
//                       onClick={() => removeElement(element.id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                   <div className="mb-2">
//                     <label className="block">Default Text</label>
//                     <input
//                       type="text"
//                       value={element.defaultValue}
//                       onChange={(e) => updateElement(element.id, { defaultValue: e.target.value })}
//                       className="w-full p-2 border rounded"
//                     />
//                   </div>
//                   <div className="mb-2">
//                     <label className="block">Max Characters</label>
//                     <input
//                       type="number"
//                       value={element.maxCharacters}
//                       onChange={(e) => updateElement(element.id, { maxCharacters: parseInt(e.target.value) || 0 })}
//                       className="w-full p-2 border rounded"
//                       min="1"
//                     />
//                   </div>
//                   <div className="mb-2">
//                     <label className="block">Text Case</label>
//                     <select
//                       value={element.case}
//                       onChange={(e) => updateElement(element.id, { case: e.target.value })}
//                       className="w-full p-2 border rounded"
//                     >
//                       <option value="none">None</option>
//                       <option value="uppercase">Uppercase</option>
//                       <option value="lowercase">Lowercase</option>
//                     </select>
//                   </div>
//                   <div className="mb-2">
//                     <label className="block">Font Size</label>
//                     <input
//                       type="number"
//                       value={element.fontSize}
//                       onChange={(e) => updateElement(element.id, { fontSize: parseInt(e.target.value) || 12 })}
//                       className="w-full p-2 border rounded"
//                       min="8"
//                     />
//                   </div>
//                   <div className="mb-2">
//                     <label className="block">Font Family</label>
//                     <select
//                       value={element.fontFamily}
//                       onChange={(e) => updateElement(element.id, { fontFamily: e.target.value })}
//                       className="w-full p-2 border rounded"
//                     >
//                       <option value="Arial">Arial</option>
//                       <option value="Helvetica">Helvetica</option>
//                       <option value="Times New Roman">Times New Roman</option>
//                       <option value="Courier New">Courier New</option>
//                       <option value="Verdana">Verdana</option>
//                     </select>
//                   </div>
//                   <div className="mb-2">
//                     <label className="block">Color Mode</label>
//                     <select
//                       value={element.colorMode}
//                       onChange={(e) => updateElement(element.id, { colorMode: e.target.value })}
//                       className="w-full p-2 border rounded"
//                     >
//                       <option value="solid">Solid</option>
//                       <option value="gradient">Gradient</option>
//                     </select>
//                   </div>
//                   {element.colorMode === 'solid' ? (
//                     <div className="mb-2">
//                       <label className="block">Text Color</label>
//                       <div className="flex items-center gap-2">
//                         <input
//                           type="color"
//                           value={element.color}
//                           onChange={(e) => updateElement(element.id, { color: e.target.value })}
//                           className="w-10 h-10"
//                         />
//                         <span>{element.color}</span>
//                       </div>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="mb-2">
//                         <label className="block">Gradient Start</label>
//                         <div className="flex items-center gap-2">
//                           <input
//                             type="color"
//                             value={element.gradientStart}
//                             onChange={(e) => updateElement(element.id, { gradientStart: e.target.value })}
//                             className="w-10 h-10"
//                           />
//                           <span>{element.gradientStart}</span>
//                         </div>
//                       </div>
//                       <div className="mb-2">
//                         <label className="block">Gradient End</label>
//                         <div className="flex items-center gap-2">
//                           <input
//                             type="color"
//                             value={element.gradientEnd}
//                             onChange={(e) => updateElement(element.id, { gradientEnd: e.target.value })}
//                             className="w-10 h-10"
//                           />
//                           <span>{element.gradientEnd}</span>
//                         </div>
//                       </div>
//                     </>
//                   )}
//                   <div className="mb-2">
//                     <label className="block">Background Color</label>
//                     <div className="flex items-center gap-2">
//                       <input
//                         type="color"
//                         value={element.backgroundColor}
//                         onChange={(e) => updateElement(element.id, { backgroundColor: e.target.value })}
//                         className="w-10 h-10"
//                       />
//                       <span>{element.backgroundColor}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//           <button
//             className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full"
//             onClick={saveCustomization}
//           >
//             Save Customization
//           </button>
//         </div>

//         {/* Preview Panel */}
//         <div className="bg-white p-4 shadow rounded">
//           <h2 className="text-xl font-bold mb-4">Preview</h2>
//           <div
//             className="relative w-full max-w-[400px] h-[400px] border-2 border-gray-300 overflow-hidden bg-gray-100"
//             ref={canvasRef}
//           >
//             {/* Background */}
//             {backgroundType === 'product_image' && product?.images?.[0]?.src ? (
//               <img
//                 src={product.images[0].src}
//                 alt="Product background"
//                 className="absolute inset-0 w-full h-full object-cover"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_189b8e9e4e2%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A20pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_189b8e9e4e2%22%3E%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22147.5%22%20y%3D%22218.1%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
//                 }}
//               />
//             ) : (
//               <div className="absolute inset-0 bg-white"></div>
//             )}

//             {/* Elements */}
//             {elements.map(element => (
//               <Rnd
//                 key={element.id}
//                 size={{ width: element.size.width, height: element.size.height }}
//                 position={{ x: element.position.x, y: element.position.y }}
//                 onDragStop={(e, d) => updateElement(element.id, { position: { x: d.x, y: d.y } })}
//                 onResizeStop={(e, direction, ref, delta, position) => {
//                   updateElement(element.id, {
//                     size: { width: ref.offsetWidth, height: ref.offsetHeight },
//                     position,
//                   });
//                 }}
//                 style={{
//                   transform: `rotate(${element.rotation}deg)`,
//                   border: '1px dashed #4a90e2',
//                   backgroundColor: element.backgroundColor === 'transparent' ? 'rgba(255,255,255,0.7)' : element.backgroundColor,
//                 }}
//                 bounds="parent"
//                 enableResizing={{
//                   top: true,
//                   right: true,
//                   bottom: true,
//                   left: true,
//                   topRight: true,
//                   bottomRight: true,
//                   bottomLeft: true,
//                   topLeft: true,
//                 }}
//               >
//                 <div
//                   style={{
//                     fontFamily: element.fontFamily,
//                     fontSize: `${element.fontSize}px`,
//                     color: element.colorMode === 'solid' ? element.color : 'transparent',
//                     backgroundImage: element.colorMode === 'gradient'
//                       ? `linear-gradient(to right, ${element.gradientStart}, ${element.gradientEnd})`
//                       : 'none',
//                     WebkitBackgroundClip: element.colorMode === 'gradient' ? 'text' : 'none',
//                     backgroundClip: element.colorMode === 'gradient' ? 'text' : 'none',
//                     textTransform: element.case,
//                     width: '100%',
//                     height: '100%',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     cursor: 'move',
//                     position: 'relative',
//                     padding: '4px',
//                     boxSizing: 'border-box',
//                     overflow: 'hidden',
//                     textOverflow: 'ellipsis',
//                     whiteSpace: 'nowrap',
//                   }}
//                 >
//                   {element.defaultValue}
//                   <div
//                     style={{
//                       position: 'absolute',
//                       top: -30,
//                       left: '50%',
//                       transform: 'translateX(-50%)',
//                       width: 24,
//                       height: 24,
//                       background: '#4a90e2',
//                       borderRadius: '50%',
//                       cursor: 'pointer',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       color: 'white',
//                       fontSize: '12px',
//                       userSelect: 'none',
//                     }}
//                     onMouseDown={(e) => handleRotation(element, e)}
//                   >
//                     ↻
//                   </div>
//                 </div>
//               </Rnd>
//             ))}
//           </div>

//           {/* Debug info */}
//           <div className="mt-4 p-2 bg-gray-100 text-sm">
//             <p><strong>Background type:</strong> {backgroundType}</p>
//             <p><strong>Product image:</strong> {product?.images?.[0]?.src ? 'Loaded' : 'Not available'}</p>
//             <p><strong>Elements count:</strong> {elements.length}</p>
//           </div>
//         </div>
//       </div>

//       {/* Add Element Modal */}
//       {showAddElementModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
//             <h2 className="text-xl font-bold mb-4">Add Element</h2>
//             <div className="mb-4">
//               <label className="block mb-2">Element Type</label>
//               <select className="w-full p-2 border rounded" defaultValue="single_line_text">
//                 <option value="single_line_text">Single Line Text</option>
//                 <option value="multi_line_text" disabled>Multi Line Text (Coming Soon)</option>
//                 <option value="image" disabled>Image (Coming Soon)</option>
//               </select>
//             </div>
//             <div className="flex justify-end space-x-2">
//               <button
//                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
//                 onClick={() => setShowAddElementModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//                 onClick={addElement}
//               >
//                 Add Element
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Color Picker Canvas */}
//       {pickingColor && (
//         <canvas
//           ref={pickerCanvasRef}
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             cursor: 'crosshair',
//             zIndex: 9999,
//           }}
//         />
//       )}
//     </div>
//   );
// }




// "use client";

// import { useState, useEffect, useRef } from 'react';
// import { Rnd } from 'react-rnd';
// import * as React from 'react';
// import axios from 'axios';

// export default function ProductCustomization({ params }) {
//   const resolvedParams = React.use(params);
//   const { productId } = resolvedParams;

//   const [product, setProduct] = useState(null);
//   const [activeTab, setActiveTab] = useState('settings');
//   const [backgroundType, setBackgroundType] = useState('product_image');
//   const [isActive, setIsActive] = useState(false);
//   const [elements, setElements] = useState([]);
//   const [showAddElementModal, setShowAddElementModal] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pickingColor, setPickingColor] = useState(null);
//   const canvasRef = useRef(null);
//   const pickerCanvasRef = useRef(null);

//   // Fetch product and metafields
//   useEffect(() => {
//     const fetchProduct = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`/api/product?productId=${productId}`, {
//           headers: { 'Content-Type': 'application/json' },
//         });
//         const data = await response.json();
//         if (data.product) {
//           setProduct(data.product);
//           const metafields = data.metafields || [];
//           const customization = metafields.find(m => m.namespace === 'customization' && m.key === 'product_customization');
//           if (customization) {
//             const parsed = JSON.parse(customization.value);
//             setBackgroundType(parsed.background_type || 'product_image');
//             setIsActive(parsed.is_active === 'true');
//             setElements(parsed.elements ? JSON.parse(parsed.elements) : []);
//           }
//         }
//       } catch (err) {
//         setError('Failed to load product');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [productId]);

//   // Screen color picking
//   useEffect(() => {
//     if (pickingColor) {
//       const canvas = pickerCanvasRef.current;
//       const ctx = canvas.getContext('2d');
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;

//       // Capture screen
//       html2canvas(document.body).then(screenCanvas => {
//         ctx.drawImage(screenCanvas, 0, 0);
//       });

//       const handleClick = (e) => {
//         const ctx = canvas.getContext('2d');
//         const pixel = ctx.getImageData(e.clientX, e.clientY, 1, 1).data;
//         const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
//         const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);

//         if (pickingColor.field === 'color') {
//           updateElement(pickingColor.elementId, { color: hexColor });
//         } else if (pickingColor.field === 'gradientStart') {
//           updateElement(pickingColor.elementId, { gradientStart: hexColor });
//         } else if (pickingColor.field === 'gradientEnd') {
//           updateElement(pickingColor.elementId, { gradientEnd: hexColor });
//         } else if (pickingColor.field === 'backgroundColor') {
//           updateElement(pickingColor.elementId, { backgroundColor: hexColor });
//         }
//         setPickingColor(null);
//       };

//       window.addEventListener('click', handleClick);
//       return () => window.removeEventListener('click', handleClick);
//     }
//   }, [pickingColor]);

//   // RGB to Hex conversion
//   const rgbToHex = (r, g, b) => {
//     return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
//   };

//   // Add new element
//   const addElement = () => {
//     if (elements.length >= 1) {
//       alert('Only one element is allowed');
//       return;
//     }
//     const newElement = {
//       id: `elem-${Date.now()}`,
//       type: 'single_line_text',
//       defaultValue: 'Sample Text',
//       fontFamily: 'Arial',
//       fontSize: 16,
//       case: 'none',
//       maxCharacters: 20,
//       color: '#000000',
//       colorMode: 'solid',
//       gradientStart: '#000000',
//       gradientEnd: '#ffffff',
//       backgroundColor: 'transparent',
//       position: { x: 50, y: 50 },
//       size: { width: 200, height: 50 },
//       rotation: 0,
//     };
//     setElements([newElement]);
//     setShowAddElementModal(false);
//   };

//   // Update element properties
//   const updateElement = (id, updates) => {
//     setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el));
//   };

//   // Remove element
//   const removeElement = (id) => {
//     setElements(elements.filter(el => el.id !== id));
//   };

//   // Save customization to Shopify metafields
//   const saveCustomization = async () => {
//     try {
//       const metafieldData = {
//         metafield: {
//           namespace: 'customization',
//           key: 'product_customization',
//           value: JSON.stringify({
//             background_type: backgroundType,
//             height: '400',
//             width: '400',
//             generate_preview: 'false',
//             preview_size: '400x400',
//             additional_file_format: 'PDF',
//             default_font_family: 'Arial',
//             elements: JSON.stringify(elements),
//             is_active: isActive.toString(),
//           }),
//           type: 'json',
//           productId
//         },
//       };

//       const response = await axios.post('/api/metafields', metafieldData);
//       if (!response.ok) throw new Error('Failed to save customization');
//       alert('Customization saved successfully');
//     } catch (err) {
//       console.log("Error saving customization");
//     }
//   };

//   // Handle rotation
//   const handleRotation = (element, e) => {
//     e.stopPropagation();
//     e.preventDefault();

//     const canvasRect = canvasRef.current.getBoundingClientRect();
//     const elementRect = {
//       left: element.position.x + canvasRect.left,
//       top: element.position.y + canvasRect.top,
//       width: element.size.width,
//       height: element.size.height
//     };

//     const center = {
//       x: elementRect.left + elementRect.width / 2,
//       y: elementRect.top + elementRect.height / 2
//     };

//     const startAngle = Math.atan2(
//       e.clientY - center.y,
//       e.clientX - center.x
//     ) * (180 / Math.PI);

//     const initialRotation = element.rotation || 0;

//     const onMouseMove = (ev) => {
//       ev.preventDefault();
//       const currentAngle = Math.atan2(
//         ev.clientY - center.y,
//         ev.clientX - center.x
//       ) * (180 / Math.PI);

//       let angleDiff = currentAngle - startAngle;
//       // Normalize the angle to avoid jumping when crossing 180/-180
//       if (angleDiff > 180) angleDiff -= 360;
//       if (angleDiff < -180) angleDiff += 360;

//       const newRotation = initialRotation + angleDiff;
//       updateElement(element.id, { rotation: newRotation });
//     };

//     const onMouseUp = () => {
//       document.removeEventListener('mousemove', onMouseMove);
//       document.removeEventListener('mouseup', onMouseUp);
//       document.removeEventListener('mouseleave', onMouseUp);
//     };

//     document.addEventListener('mousemove', onMouseMove);
//     document.addEventListener('mouseup', onMouseUp);
//     document.addEventListener('mouseleave', onMouseUp);
//   };

//   if (loading) return <div className="p-4">Loading...</div>;
//   if (error) return <div className="p-4 text-red-500">{error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">{product?.title || 'Product Customization'}</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Customization Panel */}
//         <div className="bg-white p-4 shadow rounded">
//           <div className="flex border-b mb-4">
//             <button
//               className={`px-4 py-2 ${activeTab === 'settings' ? 'border-b-2 border-blue-500' : ''}`}
//               onClick={() => setActiveTab('settings')}
//             >
//               Settings
//             </button>
//             <button
//               className={`px-4 py-2 ${activeTab === 'elements' ? 'border-b-2 border-blue-500' : ''}`}
//               onClick={() => setActiveTab('elements')}
//             >
//               Elements
//             </button>
//           </div>

//           {activeTab === 'settings' && (
//             <div>
//               <div className="mb-4">
//                 <label className="block mb-2">Background Type</label>
//                 <div>
//                   <input
//                     type="radio"
//                     id="product_image"
//                     name="backgroundType"
//                     value="product_image"
//                     checked={backgroundType === 'product_image'}
//                     onChange={() => setBackgroundType('product_image')}
//                   />
//                   <label htmlFor="product_image" className="ml-2">Product Image</label>
//                 </div>
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2">Status</label>
//                 <button
//                   className={`px-4 py-2 rounded ${isActive ? 'bg-green-500' : 'bg-red-500'} text-white`}
//                   onClick={() => setIsActive(!isActive)}
//                 >
//                   {isActive ? 'Active' : 'Inactive'}
//                 </button>
//               </div>
//             </div>
//           )}

//           {activeTab === 'elements' && (
//             <div>
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//                 onClick={() => setShowAddElementModal(true)}
//               >
//                 Add Element
//               </button>
//               {elements.map(element => (
//                 <div key={element.id} className="border p-4 mb-4 rounded">
//                   <div className="flex justify-between mb-2">
//                     <h3 className="font-bold">Text Element</h3>
//                     <button
//                       className="text-red-500"
//                       onClick={() => removeElement(element.id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                   <div className="mb-2">
//                     <label className="block">Default Text</label>
//                     <input
//                       type="text"
//                       value={element.defaultValue}
//                       onChange={(e) => updateElement(element.id, { defaultValue: e.target.value })}
//                       className="w-full p-2 border rounded"
//                     />
//                   </div>
//                   <div className="mb-2">
//                     <label className="block">Max Characters</label>
//                     <input
//                       type="number"
//                       value={element.maxCharacters}
//                       onChange={(e) => updateElement(element.id, { maxCharacters: parseInt(e.target.value) })}
//                       className="w-full p-2 border rounded"
//                     />
//                   </div>
//                   <div className="mb-2">
//                     <label className="block">Text Case</label>
//                     <select
//                       value={element.case}
//                       onChange={(e) => updateElement(element.id, { case: e.target.value })}
//                       className="w-full p-2 border rounded"
//                     >
//                       <option value="none">None</option>
//                       <option value="uppercase">Uppercase</option>
//                       <option value="lowercase">Lowercase</option>
//                     </select>
//                   </div>
//                   <div className="mb-2">
//                     <label className="block">Font Size</label>
//                     <input
//                       type="number"
//                       value={element.fontSize}
//                       onChange={(e) => updateElement(element.id, { fontSize: parseInt(e.target.value) })}
//                       className="w-full p-2 border rounded"
//                     />
//                   </div>
//                   <div className="mb-2">
//                     <label className="block">Font Family</label>
//                     <select
//                       value={element.fontFamily}
//                       onChange={(e) => updateElement(element.id, { fontFamily: e.target.value })}
//                       className="w-full p-2 border rounded"
//                     >
//                       <option value="Arial">Arial</option>
//                       <option value="Helvetica">Helvetica</option>
//                       <option value="Times New Roman">Times New Roman</option>
//                       <option value="Courier New">Courier New</option>
//                     </select>
//                   </div>
//                   <div className="mb-2">
//                     <label className="block">Color Mode</label>
//                     <select
//                       value={element.colorMode}
//                       onChange={(e) => updateElement(element.id, { colorMode: e.target.value })}
//                       className="w-full p-2 border rounded"
//                     >
//                       <option value="solid">Solid</option>
//                       <option value="gradient">Gradient</option>
//                     </select>
//                   </div>
//                   {element.colorMode === 'solid' ? (
//                     <div className="mb-2">
//                       <label className="block">Text Color</label>
//                       <div className="flex items-center gap-2">
//                         <input
//                           type="color"
//                           value={element.color}
//                           onChange={(e) => updateElement(element.id, { color: e.target.value })}
//                           className="w-10 h-10"
//                         />
//                       </div>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="mb-2">
//                         <label className="block">Gradient Start</label>
//                         <div className="flex items-center gap-2">
//                           <input
//                             type="color"
//                             value={element.gradientStart}
//                             onChange={(e) => updateElement(element.id, { gradientStart: e.target.value })}
//                             className="w-10 h-10"
//                           />
//                         </div>
//                       </div>
//                       <div className="mb-2">
//                         <label className="block">Gradient End</label>
//                         <div className="flex items-center gap-2">
//                           <input
//                             type="color"
//                             value={element.gradientEnd}
//                             onChange={(e) => updateElement(element.id, { gradientEnd: e.target.value })}
//                             className="w-10 h-10"
//                           />
//                         </div>
//                       </div>
//                     </>
//                   )}
//                   <div className="mb-2">
//                     <label className="block">Background Color</label>
//                     <div className="flex items-center gap-2">
//                       <input
//                         type="color"
//                         value={element.backgroundColor}
//                         onChange={(e) => updateElement(element.id, { backgroundColor: e.target.value })}
//                         className="w-10 h-10"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//           <button
//             className="bg-green-500 text-white px-4 py-2 rounded mt-4"
//             onClick={saveCustomization}
//           >
//             Save Customization
//           </button>
//         </div>

//         {/* Preview Panel */}
//         <div className="bg-white p-4 shadow rounded relative">
//           <h2 className="text-xl font-bold mb-4">Preview</h2>
//           <div
//             className="relative w-[400px] h-[400px] border"
//             style={{
//               background: backgroundType === 'product_image' && product?.images?.[0]?.src
//                 ? `url(${product.images[0].src}) center/cover`
//                 : 'white',
//             }}
//             ref={canvasRef}
//           >
//             {elements.map(element => (
//               <Rnd
//                 key={element.id}
//                 size={{ width: element.size.width, height: element.size.height }}
//                 position={{ x: element.position.x, y: element.position.y }}
//                 onDragStop={(e, d) => updateElement(element.id, { position: { x: d.x, y: d.y } })}
//                 onResizeStop={(e, direction, ref, delta, position) => {
//                   updateElement(element.id, {
//                     size: { width: ref.offsetWidth, height: ref.offsetHeight },
//                     position,
//                   });
//                 }}
//                 style={{
//                   transform: `rotate(${element.rotation}deg)`,
//                   border: '1px dashed gray',
//                 }}
//                 enableResizing={{
//                   top: true,
//                   right: true,
//                   bottom: true,
//                   left: true,
//                   topRight: true,
//                   bottomRight: true,
//                   bottomLeft: true,
//                   topLeft: true,
//                 }}
//               >
//                 <div
//                   style={{
//                     fontFamily: element.fontFamily,
//                     fontSize: `${element.fontSize}px`,
//                     color: element.colorMode === 'solid' ? element.color : 'transparent',
//                     backgroundImage: element.colorMode === 'gradient'
//                       ? `linear-gradient(to right, ${element.gradientStart}, ${element.gradientEnd})`
//                       : 'none',
//                     backgroundColor: element.backgroundColor,
//                     WebkitBackgroundClip: element.colorMode === 'gradient' ? 'text' : 'none',
//                     backgroundClip: element.colorMode === 'gradient' ? 'text' : 'none',
//                     textTransform: element.case,
//                     width: '100%',
//                     height: '100%',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     cursor: 'move',
//                     position: 'relative',
//                   }}
//                 >
//                   {element.defaultValue}
//                   <div
//                     style={{
//                       position: 'absolute',
//                       top: -30,
//                       left: '50%',
//                       transform: 'translateX(-50%)',
//                       width: 20,
//                       height: 20,
//                       background: 'blue',
//                       borderRadius: '50%',
//                       cursor: 'pointer',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       color: 'white',
//                       fontSize: '12px',
//                       userSelect: 'none',
//                     }}
//                     onMouseDown={(e) => handleRotation(element, e)}
//                   >
//                     ↻
//                   </div>
//                 </div>
//               </Rnd>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Add Element Modal */}
//       {showAddElementModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
//             <h2 className="text-xl font-bold mb-4">Add Element</h2>
//             <div className="mb-4">
//               <label className="block mb-2">Element Type</label>
//               <select className="w-full p-2 border rounded" defaultValue="single_line_text">
//                 <option value="single_line_text">Single Line Text</option>
//               </select>
//             </div>
//             <div className="flex justify-end space-x-2">
//               <button
//                 className="px-4 py-2 bg-gray-300 rounded"
//                 onClick={() => setShowAddElementModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-blue-500 text-white rounded"
//                 onClick={addElement}
//               >
//                 Add
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Color Picker Canvas */}
//       {pickingColor && (
//         <canvas
//           ref={pickerCanvasRef}
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             cursor: 'crosshair',
//             zIndex: 9999,
//           }}
//         />
//       )}
//     </div>
//   );
// }
