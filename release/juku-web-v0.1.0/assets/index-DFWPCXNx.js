(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function e(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=e(r);fetch(r.href,o)}})();const qa="180",nu=0,fl=1,iu=2,Kc=1,Jc=2,kn=3,hi=0,Qe=1,Mn=2,ai=0,or=1,pl=2,ml=3,gl=4,ru=5,bi=100,ou=101,su=102,au=103,lu=104,cu=200,hu=201,uu=202,du=203,$s=204,js=205,fu=206,pu=207,mu=208,gu=209,_u=210,xu=211,vu=212,Mu=213,yu=214,Qs=0,ta=1,ea=2,lr=3,na=4,ia=5,ra=6,oa=7,$c=0,Su=1,Tu=2,li=0,Eu=1,bu=2,wu=3,Au=4,Ru=5,Cu=6,Pu=7,jc=300,cr=301,hr=302,sa=303,aa=304,ns=306,la=1e3,Ri=1001,ca=1002,Tn=1003,Lu=1004,oo=1005,Cn=1006,cs=1007,Ci=1008,Dn=1009,Qc=1010,th=1011,Hr=1012,Ka=1013,Li=1014,Vn=1015,Qr=1016,Ja=1017,$a=1018,Vr=1020,eh=35902,nh=35899,ih=1021,rh=1022,Sn=1023,Gr=1026,Wr=1027,oh=1028,ja=1029,sh=1030,Qa=1031,tl=1033,Bo=33776,zo=33777,ko=33778,Ho=33779,ha=35840,ua=35841,da=35842,fa=35843,pa=36196,ma=37492,ga=37496,_a=37808,xa=37809,va=37810,Ma=37811,ya=37812,Sa=37813,Ta=37814,Ea=37815,ba=37816,wa=37817,Aa=37818,Ra=37819,Ca=37820,Pa=37821,La=36492,Da=36494,Ia=36495,Ua=36283,Na=36284,Fa=36285,Oa=36286,Du=3200,Iu=3201,ah=0,Uu=1,ri="",hn="srgb",ur="srgb-linear",Xo="linear",me="srgb",Bi=7680,_l=519,Nu=512,Fu=513,Ou=514,lh=515,Bu=516,zu=517,ku=518,Hu=519,Ba=35044,xl="300 es",Pn=2e3,Zo=2001;class mr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const r=i[t];if(r!==void 0){const o=r.indexOf(e);o!==-1&&r.splice(o,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let o=0,s=r.length;o<s;o++)r[o].call(this,t);t.target=null}}}const ze=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let vl=1234567;const Ir=Math.PI/180,Xr=180/Math.PI;function Ln(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ze[n&255]+ze[n>>8&255]+ze[n>>16&255]+ze[n>>24&255]+"-"+ze[t&255]+ze[t>>8&255]+"-"+ze[t>>16&15|64]+ze[t>>24&255]+"-"+ze[e&63|128]+ze[e>>8&255]+"-"+ze[e>>16&255]+ze[e>>24&255]+ze[i&255]+ze[i>>8&255]+ze[i>>16&255]+ze[i>>24&255]).toLowerCase()}function re(n,t,e){return Math.max(t,Math.min(e,n))}function el(n,t){return(n%t+t)%t}function Vu(n,t,e,i,r){return i+(n-t)*(r-i)/(e-t)}function Gu(n,t,e){return n!==t?(e-n)/(t-n):0}function Ur(n,t,e){return(1-e)*n+e*t}function Wu(n,t,e,i){return Ur(n,t,1-Math.exp(-e*i))}function Xu(n,t=1){return t-Math.abs(el(n,t*2)-t)}function Zu(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Yu(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function qu(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Ku(n,t){return n+Math.random()*(t-n)}function Ju(n){return n*(.5-Math.random())}function $u(n){n!==void 0&&(vl=n);let t=vl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function ju(n){return n*Ir}function Qu(n){return n*Xr}function td(n){return(n&n-1)===0&&n!==0}function ed(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function nd(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function id(n,t,e,i,r){const o=Math.cos,s=Math.sin,a=o(e/2),l=s(e/2),c=o((t+i)/2),d=s((t+i)/2),h=o((t-i)/2),f=s((t-i)/2),m=o((i-t)/2),x=s((i-t)/2);switch(r){case"XYX":n.set(a*d,l*h,l*f,a*c);break;case"YZY":n.set(l*f,a*d,l*h,a*c);break;case"ZXZ":n.set(l*h,l*f,a*d,a*c);break;case"XZX":n.set(a*d,l*x,l*m,a*c);break;case"YXY":n.set(l*m,a*d,l*x,a*c);break;case"ZYZ":n.set(l*x,l*m,a*d,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function yn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function fe(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const P={DEG2RAD:Ir,RAD2DEG:Xr,generateUUID:Ln,clamp:re,euclideanModulo:el,mapLinear:Vu,inverseLerp:Gu,lerp:Ur,damp:Wu,pingpong:Xu,smoothstep:Zu,smootherstep:Yu,randInt:qu,randFloat:Ku,randFloatSpread:Ju,seededRandom:$u,degToRad:ju,radToDeg:Qu,isPowerOfTwo:td,ceilPowerOfTwo:ed,floorPowerOfTwo:nd,setQuaternionFromProperEuler:id,normalize:fe,denormalize:yn};class vt{constructor(t=0,e=0){vt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(re(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(re(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),r=Math.sin(e),o=this.x-t.x,s=this.y-t.y;return this.x=o*i-s*r+t.x,this.y=o*r+s*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class to{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,o,s,a){let l=i[r+0],c=i[r+1],d=i[r+2],h=i[r+3];const f=o[s+0],m=o[s+1],x=o[s+2],v=o[s+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=d,t[e+3]=h;return}if(a===1){t[e+0]=f,t[e+1]=m,t[e+2]=x,t[e+3]=v;return}if(h!==v||l!==f||c!==m||d!==x){let g=1-a;const p=l*f+c*m+d*x+h*v,A=p>=0?1:-1,T=1-p*p;if(T>Number.EPSILON){const L=Math.sqrt(T),b=Math.atan2(L,p*A);g=Math.sin(g*b)/L,a=Math.sin(a*b)/L}const y=a*A;if(l=l*g+f*y,c=c*g+m*y,d=d*g+x*y,h=h*g+v*y,g===1-a){const L=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=L,c*=L,d*=L,h*=L}}t[e]=l,t[e+1]=c,t[e+2]=d,t[e+3]=h}static multiplyQuaternionsFlat(t,e,i,r,o,s){const a=i[r],l=i[r+1],c=i[r+2],d=i[r+3],h=o[s],f=o[s+1],m=o[s+2],x=o[s+3];return t[e]=a*x+d*h+l*m-c*f,t[e+1]=l*x+d*f+c*h-a*m,t[e+2]=c*x+d*m+a*f-l*h,t[e+3]=d*x-a*h-l*f-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,r=t._y,o=t._z,s=t._order,a=Math.cos,l=Math.sin,c=a(i/2),d=a(r/2),h=a(o/2),f=l(i/2),m=l(r/2),x=l(o/2);switch(s){case"XYZ":this._x=f*d*h+c*m*x,this._y=c*m*h-f*d*x,this._z=c*d*x+f*m*h,this._w=c*d*h-f*m*x;break;case"YXZ":this._x=f*d*h+c*m*x,this._y=c*m*h-f*d*x,this._z=c*d*x-f*m*h,this._w=c*d*h+f*m*x;break;case"ZXY":this._x=f*d*h-c*m*x,this._y=c*m*h+f*d*x,this._z=c*d*x+f*m*h,this._w=c*d*h-f*m*x;break;case"ZYX":this._x=f*d*h-c*m*x,this._y=c*m*h+f*d*x,this._z=c*d*x-f*m*h,this._w=c*d*h+f*m*x;break;case"YZX":this._x=f*d*h+c*m*x,this._y=c*m*h+f*d*x,this._z=c*d*x-f*m*h,this._w=c*d*h-f*m*x;break;case"XZY":this._x=f*d*h-c*m*x,this._y=c*m*h-f*d*x,this._z=c*d*x+f*m*h,this._w=c*d*h+f*m*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],r=e[4],o=e[8],s=e[1],a=e[5],l=e[9],c=e[2],d=e[6],h=e[10],f=i+a+h;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(d-l)*m,this._y=(o-c)*m,this._z=(s-r)*m}else if(i>a&&i>h){const m=2*Math.sqrt(1+i-a-h);this._w=(d-l)/m,this._x=.25*m,this._y=(r+s)/m,this._z=(o+c)/m}else if(a>h){const m=2*Math.sqrt(1+a-i-h);this._w=(o-c)/m,this._x=(r+s)/m,this._y=.25*m,this._z=(l+d)/m}else{const m=2*Math.sqrt(1+h-i-a);this._w=(s-r)/m,this._x=(o+c)/m,this._y=(l+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(re(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,r=t._y,o=t._z,s=t._w,a=e._x,l=e._y,c=e._z,d=e._w;return this._x=i*d+s*a+r*c-o*l,this._y=r*d+s*l+o*a-i*c,this._z=o*d+s*c+i*l-r*a,this._w=s*d-i*a-r*l-o*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,r=this._y,o=this._z,s=this._w;let a=s*t._w+i*t._x+r*t._y+o*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=s,this._x=i,this._y=r,this._z=o,this;const l=1-a*a;if(l<=Number.EPSILON){const m=1-e;return this._w=m*s+e*this._w,this._x=m*i+e*this._x,this._y=m*r+e*this._y,this._z=m*o+e*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,a),h=Math.sin((1-e)*d)/c,f=Math.sin(e*d)/c;return this._w=s*h+this._w*f,this._x=i*h+this._x*f,this._y=r*h+this._y*f,this._z=o*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),o=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),o*Math.sin(e),o*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class E{constructor(t=0,e=0,i=0){E.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ml.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ml.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,r=this.z,o=t.elements;return this.x=o[0]*e+o[3]*i+o[6]*r,this.y=o[1]*e+o[4]*i+o[7]*r,this.z=o[2]*e+o[5]*i+o[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,o=t.elements,s=1/(o[3]*e+o[7]*i+o[11]*r+o[15]);return this.x=(o[0]*e+o[4]*i+o[8]*r+o[12])*s,this.y=(o[1]*e+o[5]*i+o[9]*r+o[13])*s,this.z=(o[2]*e+o[6]*i+o[10]*r+o[14])*s,this}applyQuaternion(t){const e=this.x,i=this.y,r=this.z,o=t.x,s=t.y,a=t.z,l=t.w,c=2*(s*r-a*i),d=2*(a*e-o*r),h=2*(o*i-s*e);return this.x=e+l*c+s*h-a*d,this.y=i+l*d+a*c-o*h,this.z=r+l*h+o*d-s*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,r=this.z,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*r,this.y=o[1]*e+o[5]*i+o[9]*r,this.z=o[2]*e+o[6]*i+o[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this.z=re(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this.z=re(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(re(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,r=t.y,o=t.z,s=e.x,a=e.y,l=e.z;return this.x=r*l-o*a,this.y=o*s-i*l,this.z=i*a-r*s,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return hs.copy(this).projectOnVector(t),this.sub(hs)}reflect(t){return this.sub(hs.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(re(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const hs=new E,Ml=new to;class Qt{constructor(t,e,i,r,o,s,a,l,c){Qt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,o,s,a,l,c)}set(t,e,i,r,o,s,a,l,c){const d=this.elements;return d[0]=t,d[1]=r,d[2]=a,d[3]=e,d[4]=o,d[5]=l,d[6]=i,d[7]=s,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,o=this.elements,s=i[0],a=i[3],l=i[6],c=i[1],d=i[4],h=i[7],f=i[2],m=i[5],x=i[8],v=r[0],g=r[3],p=r[6],A=r[1],T=r[4],y=r[7],L=r[2],b=r[5],C=r[8];return o[0]=s*v+a*A+l*L,o[3]=s*g+a*T+l*b,o[6]=s*p+a*y+l*C,o[1]=c*v+d*A+h*L,o[4]=c*g+d*T+h*b,o[7]=c*p+d*y+h*C,o[2]=f*v+m*A+x*L,o[5]=f*g+m*T+x*b,o[8]=f*p+m*y+x*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],r=t[2],o=t[3],s=t[4],a=t[5],l=t[6],c=t[7],d=t[8];return e*s*d-e*a*c-i*o*d+i*a*l+r*o*c-r*s*l}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],o=t[3],s=t[4],a=t[5],l=t[6],c=t[7],d=t[8],h=d*s-a*c,f=a*l-d*o,m=c*o-s*l,x=e*h+i*f+r*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/x;return t[0]=h*v,t[1]=(r*c-d*i)*v,t[2]=(a*i-r*s)*v,t[3]=f*v,t[4]=(d*e-r*l)*v,t[5]=(r*o-a*e)*v,t[6]=m*v,t[7]=(i*l-c*e)*v,t[8]=(s*e-i*o)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,o,s,a){const l=Math.cos(o),c=Math.sin(o);return this.set(i*l,i*c,-i*(l*s+c*a)+s+t,-r*c,r*l,-r*(-c*s+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(us.makeScale(t,e)),this}rotate(t){return this.premultiply(us.makeRotation(-t)),this}translate(t,e){return this.premultiply(us.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const us=new Qt;function ch(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Yo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function rd(){const n=Yo("canvas");return n.style.display="block",n}const yl={};function Zr(n){n in yl||(yl[n]=!0,console.warn(n))}function od(n,t,e){return new Promise(function(i,r){function o(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(o,e);break;default:i()}}setTimeout(o,e)})}const Sl=new Qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Tl=new Qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function sd(){const n={enabled:!0,workingColorSpace:ur,spaces:{},convert:function(r,o,s){return this.enabled===!1||o===s||!o||!s||(this.spaces[o].transfer===me&&(r.r=Gn(r.r),r.g=Gn(r.g),r.b=Gn(r.b)),this.spaces[o].primaries!==this.spaces[s].primaries&&(r.applyMatrix3(this.spaces[o].toXYZ),r.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===me&&(r.r=sr(r.r),r.g=sr(r.g),r.b=sr(r.b))),r},workingToColorSpace:function(r,o){return this.convert(r,this.workingColorSpace,o)},colorSpaceToWorking:function(r,o){return this.convert(r,o,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ri?Xo:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,o=this.workingColorSpace){return r.fromArray(this.spaces[o].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,o,s){return r.copy(this.spaces[o].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,o){return Zr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,o)},toWorkingColorSpace:function(r,o){return Zr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,o)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ur]:{primaries:t,whitePoint:i,transfer:Xo,toXYZ:Sl,fromXYZ:Tl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:hn},outputColorSpaceConfig:{drawingBufferColorSpace:hn}},[hn]:{primaries:t,whitePoint:i,transfer:me,toXYZ:Sl,fromXYZ:Tl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:hn}}}),n}const he=sd();function Gn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function sr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let zi;class ad{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{zi===void 0&&(zi=Yo("canvas")),zi.width=t.width,zi.height=t.height;const r=zi.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),i=zi}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Yo("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),o=r.data;for(let s=0;s<o.length;s++)o[s]=Gn(o[s]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Gn(e[i]/255)*255):e[i]=Gn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let ld=0;class nl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ld++}),this.uuid=Ln(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let o;if(Array.isArray(r)){o=[];for(let s=0,a=r.length;s<a;s++)r[s].isDataTexture?o.push(ds(r[s].image)):o.push(ds(r[s]))}else o=ds(r);i.url=o}return e||(t.images[this.uuid]=i),i}}function ds(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ad.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let cd=0;const fs=new E;class Ye extends mr{constructor(t=Ye.DEFAULT_IMAGE,e=Ye.DEFAULT_MAPPING,i=Ri,r=Ri,o=Cn,s=Ci,a=Sn,l=Dn,c=Ye.DEFAULT_ANISOTROPY,d=ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:cd++}),this.uuid=Ln(),this.name="",this.source=new nl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=o,this.minFilter=s,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new vt(0,0),this.repeat=new vt(1,1),this.center=new vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(fs).x}get height(){return this.source.getSize(fs).y}get depth(){return this.source.getSize(fs).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==jc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case la:t.x=t.x-Math.floor(t.x);break;case Ri:t.x=t.x<0?0:1;break;case ca:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case la:t.y=t.y-Math.floor(t.y);break;case Ri:t.y=t.y<0?0:1;break;case ca:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ye.DEFAULT_IMAGE=null;Ye.DEFAULT_MAPPING=jc;Ye.DEFAULT_ANISOTROPY=1;class Ee{constructor(t=0,e=0,i=0,r=1){Ee.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,o=this.w,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*r+s[12]*o,this.y=s[1]*e+s[5]*i+s[9]*r+s[13]*o,this.z=s[2]*e+s[6]*i+s[10]*r+s[14]*o,this.w=s[3]*e+s[7]*i+s[11]*r+s[15]*o,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,o;const l=t.elements,c=l[0],d=l[4],h=l[8],f=l[1],m=l[5],x=l[9],v=l[2],g=l[6],p=l[10];if(Math.abs(d-f)<.01&&Math.abs(h-v)<.01&&Math.abs(x-g)<.01){if(Math.abs(d+f)<.1&&Math.abs(h+v)<.1&&Math.abs(x+g)<.1&&Math.abs(c+m+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const T=(c+1)/2,y=(m+1)/2,L=(p+1)/2,b=(d+f)/4,C=(h+v)/4,U=(x+g)/4;return T>y&&T>L?T<.01?(i=0,r=.707106781,o=.707106781):(i=Math.sqrt(T),r=b/i,o=C/i):y>L?y<.01?(i=.707106781,r=0,o=.707106781):(r=Math.sqrt(y),i=b/r,o=U/r):L<.01?(i=.707106781,r=.707106781,o=0):(o=Math.sqrt(L),i=C/o,r=U/o),this.set(i,r,o,e),this}let A=Math.sqrt((g-x)*(g-x)+(h-v)*(h-v)+(f-d)*(f-d));return Math.abs(A)<.001&&(A=1),this.x=(g-x)/A,this.y=(h-v)/A,this.z=(f-d)/A,this.w=Math.acos((c+m+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this.z=re(this.z,t.z,e.z),this.w=re(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this.z=re(this.z,t,e),this.w=re(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(re(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class hd extends mr{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Cn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Ee(0,0,t,e),this.scissorTest=!1,this.viewport=new Ee(0,0,t,e);const r={width:t,height:e,depth:i.depth},o=new Ye(r);this.textures=[];const s=i.count;for(let a=0;a<s;a++)this.textures[a]=o.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:Cn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,o=this.textures.length;r<o;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const r=Object.assign({},t.textures[e].image);this.textures[e].source=new nl(r)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Di extends hd{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class hh extends Ye{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=Ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class ud extends Ye{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=Ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class eo{constructor(t=new E(1/0,1/0,1/0),e=new E(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(pn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(pn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=pn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const o=i.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let s=0,a=o.count;s<a;s++)t.isMesh===!0?t.getVertexPosition(s,pn):pn.fromBufferAttribute(o,s),pn.applyMatrix4(t.matrixWorld),this.expandByPoint(pn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),so.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),so.copy(i.boundingBox)),so.applyMatrix4(t.matrixWorld),this.union(so)}const r=t.children;for(let o=0,s=r.length;o<s;o++)this.expandByObject(r[o],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,pn),pn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(vr),ao.subVectors(this.max,vr),ki.subVectors(t.a,vr),Hi.subVectors(t.b,vr),Vi.subVectors(t.c,vr),Kn.subVectors(Hi,ki),Jn.subVectors(Vi,Hi),gi.subVectors(ki,Vi);let e=[0,-Kn.z,Kn.y,0,-Jn.z,Jn.y,0,-gi.z,gi.y,Kn.z,0,-Kn.x,Jn.z,0,-Jn.x,gi.z,0,-gi.x,-Kn.y,Kn.x,0,-Jn.y,Jn.x,0,-gi.y,gi.x,0];return!ps(e,ki,Hi,Vi,ao)||(e=[1,0,0,0,1,0,0,0,1],!ps(e,ki,Hi,Vi,ao))?!1:(lo.crossVectors(Kn,Jn),e=[lo.x,lo.y,lo.z],ps(e,ki,Hi,Vi,ao))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,pn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(pn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Nn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Nn=[new E,new E,new E,new E,new E,new E,new E,new E],pn=new E,so=new eo,ki=new E,Hi=new E,Vi=new E,Kn=new E,Jn=new E,gi=new E,vr=new E,ao=new E,lo=new E,_i=new E;function ps(n,t,e,i,r){for(let o=0,s=n.length-3;o<=s;o+=3){_i.fromArray(n,o);const a=r.x*Math.abs(_i.x)+r.y*Math.abs(_i.y)+r.z*Math.abs(_i.z),l=t.dot(_i),c=e.dot(_i),d=i.dot(_i);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>a)return!1}return!0}const dd=new eo,Mr=new E,ms=new E;class is{constructor(t=new E,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):dd.setFromPoints(t).getCenter(i);let r=0;for(let o=0,s=t.length;o<s;o++)r=Math.max(r,i.distanceToSquared(t[o]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Mr.subVectors(t,this.center);const e=Mr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(Mr,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ms.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Mr.copy(t.center).add(ms)),this.expandByPoint(Mr.copy(t.center).sub(ms))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const Fn=new E,gs=new E,co=new E,$n=new E,_s=new E,ho=new E,xs=new E;class uh{constructor(t=new E,e=new E(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Fn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Fn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Fn.copy(this.origin).addScaledVector(this.direction,e),Fn.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){gs.copy(t).add(e).multiplyScalar(.5),co.copy(e).sub(t).normalize(),$n.copy(this.origin).sub(gs);const o=t.distanceTo(e)*.5,s=-this.direction.dot(co),a=$n.dot(this.direction),l=-$n.dot(co),c=$n.lengthSq(),d=Math.abs(1-s*s);let h,f,m,x;if(d>0)if(h=s*l-a,f=s*a-l,x=o*d,h>=0)if(f>=-x)if(f<=x){const v=1/d;h*=v,f*=v,m=h*(h+s*f+2*a)+f*(s*h+f+2*l)+c}else f=o,h=Math.max(0,-(s*f+a)),m=-h*h+f*(f+2*l)+c;else f=-o,h=Math.max(0,-(s*f+a)),m=-h*h+f*(f+2*l)+c;else f<=-x?(h=Math.max(0,-(-s*o+a)),f=h>0?-o:Math.min(Math.max(-o,-l),o),m=-h*h+f*(f+2*l)+c):f<=x?(h=0,f=Math.min(Math.max(-o,-l),o),m=f*(f+2*l)+c):(h=Math.max(0,-(s*o+a)),f=h>0?o:Math.min(Math.max(-o,-l),o),m=-h*h+f*(f+2*l)+c);else f=s>0?-o:o,h=Math.max(0,-(s*f+a)),m=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(gs).addScaledVector(co,f),m}intersectSphere(t,e){Fn.subVectors(t.center,this.origin);const i=Fn.dot(this.direction),r=Fn.dot(Fn)-i*i,o=t.radius*t.radius;if(r>o)return null;const s=Math.sqrt(o-r),a=i-s,l=i+s;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,o,s,a,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,r=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,r=(t.min.x-f.x)*c),d>=0?(o=(t.min.y-f.y)*d,s=(t.max.y-f.y)*d):(o=(t.max.y-f.y)*d,s=(t.min.y-f.y)*d),i>s||o>r||((o>i||isNaN(i))&&(i=o),(s<r||isNaN(r))&&(r=s),h>=0?(a=(t.min.z-f.z)*h,l=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,l=(t.min.z-f.z)*h),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,Fn)!==null}intersectTriangle(t,e,i,r,o){_s.subVectors(e,t),ho.subVectors(i,t),xs.crossVectors(_s,ho);let s=this.direction.dot(xs),a;if(s>0){if(r)return null;a=1}else if(s<0)a=-1,s=-s;else return null;$n.subVectors(this.origin,t);const l=a*this.direction.dot(ho.crossVectors($n,ho));if(l<0)return null;const c=a*this.direction.dot(_s.cross($n));if(c<0||l+c>s)return null;const d=-a*$n.dot(xs);return d<0?null:this.at(d/s,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Me{constructor(t,e,i,r,o,s,a,l,c,d,h,f,m,x,v,g){Me.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,o,s,a,l,c,d,h,f,m,x,v,g)}set(t,e,i,r,o,s,a,l,c,d,h,f,m,x,v,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=r,p[1]=o,p[5]=s,p[9]=a,p[13]=l,p[2]=c,p[6]=d,p[10]=h,p[14]=f,p[3]=m,p[7]=x,p[11]=v,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Me().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,r=1/Gi.setFromMatrixColumn(t,0).length(),o=1/Gi.setFromMatrixColumn(t,1).length(),s=1/Gi.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*o,e[5]=i[5]*o,e[6]=i[6]*o,e[7]=0,e[8]=i[8]*s,e[9]=i[9]*s,e[10]=i[10]*s,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,r=t.y,o=t.z,s=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),d=Math.cos(o),h=Math.sin(o);if(t.order==="XYZ"){const f=s*d,m=s*h,x=a*d,v=a*h;e[0]=l*d,e[4]=-l*h,e[8]=c,e[1]=m+x*c,e[5]=f-v*c,e[9]=-a*l,e[2]=v-f*c,e[6]=x+m*c,e[10]=s*l}else if(t.order==="YXZ"){const f=l*d,m=l*h,x=c*d,v=c*h;e[0]=f+v*a,e[4]=x*a-m,e[8]=s*c,e[1]=s*h,e[5]=s*d,e[9]=-a,e[2]=m*a-x,e[6]=v+f*a,e[10]=s*l}else if(t.order==="ZXY"){const f=l*d,m=l*h,x=c*d,v=c*h;e[0]=f-v*a,e[4]=-s*h,e[8]=x+m*a,e[1]=m+x*a,e[5]=s*d,e[9]=v-f*a,e[2]=-s*c,e[6]=a,e[10]=s*l}else if(t.order==="ZYX"){const f=s*d,m=s*h,x=a*d,v=a*h;e[0]=l*d,e[4]=x*c-m,e[8]=f*c+v,e[1]=l*h,e[5]=v*c+f,e[9]=m*c-x,e[2]=-c,e[6]=a*l,e[10]=s*l}else if(t.order==="YZX"){const f=s*l,m=s*c,x=a*l,v=a*c;e[0]=l*d,e[4]=v-f*h,e[8]=x*h+m,e[1]=h,e[5]=s*d,e[9]=-a*d,e[2]=-c*d,e[6]=m*h+x,e[10]=f-v*h}else if(t.order==="XZY"){const f=s*l,m=s*c,x=a*l,v=a*c;e[0]=l*d,e[4]=-h,e[8]=c*d,e[1]=f*h+v,e[5]=s*d,e[9]=m*h-x,e[2]=x*h-m,e[6]=a*d,e[10]=v*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(fd,t,pd)}lookAt(t,e,i){const r=this.elements;return tn.subVectors(t,e),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),jn.crossVectors(i,tn),jn.lengthSq()===0&&(Math.abs(i.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),jn.crossVectors(i,tn)),jn.normalize(),uo.crossVectors(tn,jn),r[0]=jn.x,r[4]=uo.x,r[8]=tn.x,r[1]=jn.y,r[5]=uo.y,r[9]=tn.y,r[2]=jn.z,r[6]=uo.z,r[10]=tn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,o=this.elements,s=i[0],a=i[4],l=i[8],c=i[12],d=i[1],h=i[5],f=i[9],m=i[13],x=i[2],v=i[6],g=i[10],p=i[14],A=i[3],T=i[7],y=i[11],L=i[15],b=r[0],C=r[4],U=r[8],M=r[12],_=r[1],u=r[5],N=r[9],O=r[13],k=r[2],H=r[6],G=r[10],Z=r[14],V=r[3],et=r[7],rt=r[11],ht=r[15];return o[0]=s*b+a*_+l*k+c*V,o[4]=s*C+a*u+l*H+c*et,o[8]=s*U+a*N+l*G+c*rt,o[12]=s*M+a*O+l*Z+c*ht,o[1]=d*b+h*_+f*k+m*V,o[5]=d*C+h*u+f*H+m*et,o[9]=d*U+h*N+f*G+m*rt,o[13]=d*M+h*O+f*Z+m*ht,o[2]=x*b+v*_+g*k+p*V,o[6]=x*C+v*u+g*H+p*et,o[10]=x*U+v*N+g*G+p*rt,o[14]=x*M+v*O+g*Z+p*ht,o[3]=A*b+T*_+y*k+L*V,o[7]=A*C+T*u+y*H+L*et,o[11]=A*U+T*N+y*G+L*rt,o[15]=A*M+T*O+y*Z+L*ht,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],r=t[8],o=t[12],s=t[1],a=t[5],l=t[9],c=t[13],d=t[2],h=t[6],f=t[10],m=t[14],x=t[3],v=t[7],g=t[11],p=t[15];return x*(+o*l*h-r*c*h-o*a*f+i*c*f+r*a*m-i*l*m)+v*(+e*l*m-e*c*f+o*s*f-r*s*m+r*c*d-o*l*d)+g*(+e*c*h-e*a*m-o*s*h+i*s*m+o*a*d-i*c*d)+p*(-r*a*d-e*l*h+e*a*f+r*s*h-i*s*f+i*l*d)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],o=t[3],s=t[4],a=t[5],l=t[6],c=t[7],d=t[8],h=t[9],f=t[10],m=t[11],x=t[12],v=t[13],g=t[14],p=t[15],A=h*g*c-v*f*c+v*l*m-a*g*m-h*l*p+a*f*p,T=x*f*c-d*g*c-x*l*m+s*g*m+d*l*p-s*f*p,y=d*v*c-x*h*c+x*a*m-s*v*m-d*a*p+s*h*p,L=x*h*l-d*v*l-x*a*f+s*v*f+d*a*g-s*h*g,b=e*A+i*T+r*y+o*L;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/b;return t[0]=A*C,t[1]=(v*f*o-h*g*o-v*r*m+i*g*m+h*r*p-i*f*p)*C,t[2]=(a*g*o-v*l*o+v*r*c-i*g*c-a*r*p+i*l*p)*C,t[3]=(h*l*o-a*f*o-h*r*c+i*f*c+a*r*m-i*l*m)*C,t[4]=T*C,t[5]=(d*g*o-x*f*o+x*r*m-e*g*m-d*r*p+e*f*p)*C,t[6]=(x*l*o-s*g*o-x*r*c+e*g*c+s*r*p-e*l*p)*C,t[7]=(s*f*o-d*l*o+d*r*c-e*f*c-s*r*m+e*l*m)*C,t[8]=y*C,t[9]=(x*h*o-d*v*o-x*i*m+e*v*m+d*i*p-e*h*p)*C,t[10]=(s*v*o-x*a*o+x*i*c-e*v*c-s*i*p+e*a*p)*C,t[11]=(d*a*o-s*h*o-d*i*c+e*h*c+s*i*m-e*a*m)*C,t[12]=L*C,t[13]=(d*v*r-x*h*r+x*i*f-e*v*f-d*i*g+e*h*g)*C,t[14]=(x*a*r-s*v*r-x*i*l+e*v*l+s*i*g-e*a*g)*C,t[15]=(s*h*r-d*a*r+d*i*l-e*h*l-s*i*f+e*a*f)*C,this}scale(t){const e=this.elements,i=t.x,r=t.y,o=t.z;return e[0]*=i,e[4]*=r,e[8]*=o,e[1]*=i,e[5]*=r,e[9]*=o,e[2]*=i,e[6]*=r,e[10]*=o,e[3]*=i,e[7]*=r,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),r=Math.sin(e),o=1-i,s=t.x,a=t.y,l=t.z,c=o*s,d=o*a;return this.set(c*s+i,c*a-r*l,c*l+r*a,0,c*a+r*l,d*a+i,d*l-r*s,0,c*l-r*a,d*l+r*s,o*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,o,s){return this.set(1,i,o,0,t,1,s,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){const r=this.elements,o=e._x,s=e._y,a=e._z,l=e._w,c=o+o,d=s+s,h=a+a,f=o*c,m=o*d,x=o*h,v=s*d,g=s*h,p=a*h,A=l*c,T=l*d,y=l*h,L=i.x,b=i.y,C=i.z;return r[0]=(1-(v+p))*L,r[1]=(m+y)*L,r[2]=(x-T)*L,r[3]=0,r[4]=(m-y)*b,r[5]=(1-(f+p))*b,r[6]=(g+A)*b,r[7]=0,r[8]=(x+T)*C,r[9]=(g-A)*C,r[10]=(1-(f+v))*C,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){const r=this.elements;let o=Gi.set(r[0],r[1],r[2]).length();const s=Gi.set(r[4],r[5],r[6]).length(),a=Gi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(o=-o),t.x=r[12],t.y=r[13],t.z=r[14],mn.copy(this);const c=1/o,d=1/s,h=1/a;return mn.elements[0]*=c,mn.elements[1]*=c,mn.elements[2]*=c,mn.elements[4]*=d,mn.elements[5]*=d,mn.elements[6]*=d,mn.elements[8]*=h,mn.elements[9]*=h,mn.elements[10]*=h,e.setFromRotationMatrix(mn),i.x=o,i.y=s,i.z=a,this}makePerspective(t,e,i,r,o,s,a=Pn,l=!1){const c=this.elements,d=2*o/(e-t),h=2*o/(i-r),f=(e+t)/(e-t),m=(i+r)/(i-r);let x,v;if(l)x=o/(s-o),v=s*o/(s-o);else if(a===Pn)x=-(s+o)/(s-o),v=-2*s*o/(s-o);else if(a===Zo)x=-s/(s-o),v=-s*o/(s-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=d,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=x,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,r,o,s,a=Pn,l=!1){const c=this.elements,d=2/(e-t),h=2/(i-r),f=-(e+t)/(e-t),m=-(i+r)/(i-r);let x,v;if(l)x=1/(s-o),v=s/(s-o);else if(a===Pn)x=-2/(s-o),v=-(s+o)/(s-o);else if(a===Zo)x=-1/(s-o),v=-o/(s-o);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=d,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=h,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=x,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Gi=new E,mn=new Me,fd=new E(0,0,0),pd=new E(1,1,1),jn=new E,uo=new E,tn=new E,El=new Me,bl=new to;class Re{constructor(t=0,e=0,i=0,r=Re.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const r=t.elements,o=r[0],s=r[4],a=r[8],l=r[1],c=r[5],d=r[9],h=r[2],f=r[6],m=r[10];switch(e){case"XYZ":this._y=Math.asin(re(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-s,o)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-re(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,o),this._z=0);break;case"ZXY":this._x=Math.asin(re(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-re(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(re(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,o)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-re(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-d,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return El.makeRotationFromQuaternion(t),this.setFromRotationMatrix(El,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return bl.setFromEuler(this),this.setFromQuaternion(bl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Re.DEFAULT_ORDER="XYZ";class dh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let md=0;const wl=new E,Wi=new to,On=new Me,fo=new E,yr=new E,gd=new E,_d=new to,Al=new E(1,0,0),Rl=new E(0,1,0),Cl=new E(0,0,1),Pl={type:"added"},xd={type:"removed"},Xi={type:"childadded",child:null},vs={type:"childremoved",child:null};class Ie extends mr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:md++}),this.uuid=Ln(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ie.DEFAULT_UP.clone();const t=new E,e=new Re,i=new to,r=new E(1,1,1);function o(){i.setFromEuler(e,!1)}function s(){e.setFromQuaternion(i,void 0,!1)}e._onChange(o),i._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Me},normalMatrix:{value:new Qt}}),this.matrix=new Me,this.matrixWorld=new Me,this.matrixAutoUpdate=Ie.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ie.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new dh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Wi.setFromAxisAngle(t,e),this.quaternion.multiply(Wi),this}rotateOnWorldAxis(t,e){return Wi.setFromAxisAngle(t,e),this.quaternion.premultiply(Wi),this}rotateX(t){return this.rotateOnAxis(Al,t)}rotateY(t){return this.rotateOnAxis(Rl,t)}rotateZ(t){return this.rotateOnAxis(Cl,t)}translateOnAxis(t,e){return wl.copy(t).applyQuaternion(this.quaternion),this.position.add(wl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Al,t)}translateY(t){return this.translateOnAxis(Rl,t)}translateZ(t){return this.translateOnAxis(Cl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(On.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?fo.copy(t):fo.set(t,e,i);const r=this.parent;this.updateWorldMatrix(!0,!1),yr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?On.lookAt(yr,fo,this.up):On.lookAt(fo,yr,this.up),this.quaternion.setFromRotationMatrix(On),r&&(On.extractRotation(r.matrixWorld),Wi.setFromRotationMatrix(On),this.quaternion.premultiply(Wi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Pl),Xi.child=t,this.dispatchEvent(Xi),Xi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(xd),vs.child=t,this.dispatchEvent(vs),vs.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),On.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),On.multiply(t.parent.matrixWorld)),t.applyMatrix4(On),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Pl),Xi.child=t,this.dispatchEvent(Xi),Xi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){const s=this.children[i].getObjectByProperty(t,e);if(s!==void 0)return s}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const r=this.children;for(let o=0,s=r.length;o<s;o++)r[o].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yr,t,gd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yr,_d,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let o=0,s=r.length;o<s;o++)r[o].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function o(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=o(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];o(t.shapes,h)}else o(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(o(t.materials,this.material[l]));r.material=a}else r.material=o(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(o(t.animations,l))}}if(e){const a=s(t.geometries),l=s(t.materials),c=s(t.textures),d=s(t.images),h=s(t.shapes),f=s(t.skeletons),m=s(t.animations),x=s(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),m.length>0&&(i.animations=m),x.length>0&&(i.nodes=x)}return i.object=r,i;function s(a){const l=[];for(const c in a){const d=a[c];delete d.metadata,l.push(d)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}Ie.DEFAULT_UP=new E(0,1,0);Ie.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ie.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const gn=new E,Bn=new E,Ms=new E,zn=new E,Zi=new E,Yi=new E,Ll=new E,ys=new E,Ss=new E,Ts=new E,Es=new Ee,bs=new Ee,ws=new Ee;class un{constructor(t=new E,e=new E,i=new E){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),gn.subVectors(t,e),r.cross(gn);const o=r.lengthSq();return o>0?r.multiplyScalar(1/Math.sqrt(o)):r.set(0,0,0)}static getBarycoord(t,e,i,r,o){gn.subVectors(r,e),Bn.subVectors(i,e),Ms.subVectors(t,e);const s=gn.dot(gn),a=gn.dot(Bn),l=gn.dot(Ms),c=Bn.dot(Bn),d=Bn.dot(Ms),h=s*c-a*a;if(h===0)return o.set(0,0,0),null;const f=1/h,m=(c*l-a*d)*f,x=(s*d-a*l)*f;return o.set(1-m-x,x,m)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,zn)===null?!1:zn.x>=0&&zn.y>=0&&zn.x+zn.y<=1}static getInterpolation(t,e,i,r,o,s,a,l){return this.getBarycoord(t,e,i,r,zn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(o,zn.x),l.addScaledVector(s,zn.y),l.addScaledVector(a,zn.z),l)}static getInterpolatedAttribute(t,e,i,r,o,s){return Es.setScalar(0),bs.setScalar(0),ws.setScalar(0),Es.fromBufferAttribute(t,e),bs.fromBufferAttribute(t,i),ws.fromBufferAttribute(t,r),s.setScalar(0),s.addScaledVector(Es,o.x),s.addScaledVector(bs,o.y),s.addScaledVector(ws,o.z),s}static isFrontFacing(t,e,i,r){return gn.subVectors(i,e),Bn.subVectors(t,e),gn.cross(Bn).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return gn.subVectors(this.c,this.b),Bn.subVectors(this.a,this.b),gn.cross(Bn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return un.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return un.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,o){return un.getInterpolation(t,this.a,this.b,this.c,e,i,r,o)}containsPoint(t){return un.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return un.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,r=this.b,o=this.c;let s,a;Zi.subVectors(r,i),Yi.subVectors(o,i),ys.subVectors(t,i);const l=Zi.dot(ys),c=Yi.dot(ys);if(l<=0&&c<=0)return e.copy(i);Ss.subVectors(t,r);const d=Zi.dot(Ss),h=Yi.dot(Ss);if(d>=0&&h<=d)return e.copy(r);const f=l*h-d*c;if(f<=0&&l>=0&&d<=0)return s=l/(l-d),e.copy(i).addScaledVector(Zi,s);Ts.subVectors(t,o);const m=Zi.dot(Ts),x=Yi.dot(Ts);if(x>=0&&m<=x)return e.copy(o);const v=m*c-l*x;if(v<=0&&c>=0&&x<=0)return a=c/(c-x),e.copy(i).addScaledVector(Yi,a);const g=d*x-m*h;if(g<=0&&h-d>=0&&m-x>=0)return Ll.subVectors(o,r),a=(h-d)/(h-d+(m-x)),e.copy(r).addScaledVector(Ll,a);const p=1/(g+v+f);return s=v*p,a=f*p,e.copy(i).addScaledVector(Zi,s).addScaledVector(Yi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const fh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qn={h:0,s:0,l:0},po={h:0,s:0,l:0};function As(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class ne{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=hn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,he.colorSpaceToWorking(this,e),this}setRGB(t,e,i,r=he.workingColorSpace){return this.r=t,this.g=e,this.b=i,he.colorSpaceToWorking(this,r),this}setHSL(t,e,i,r=he.workingColorSpace){if(t=el(t,1),e=re(e,0,1),i=re(i,0,1),e===0)this.r=this.g=this.b=i;else{const o=i<=.5?i*(1+e):i+e-i*e,s=2*i-o;this.r=As(s,o,t+1/3),this.g=As(s,o,t),this.b=As(s,o,t-1/3)}return he.colorSpaceToWorking(this,r),this}setStyle(t,e=hn){function i(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const s=r[1],a=r[2];switch(s){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=r[1],s=o.length;if(s===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(s===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=hn){const i=fh[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Gn(t.r),this.g=Gn(t.g),this.b=Gn(t.b),this}copyLinearToSRGB(t){return this.r=sr(t.r),this.g=sr(t.g),this.b=sr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=hn){return he.workingToColorSpace(ke.copy(this),t),Math.round(re(ke.r*255,0,255))*65536+Math.round(re(ke.g*255,0,255))*256+Math.round(re(ke.b*255,0,255))}getHexString(t=hn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=he.workingColorSpace){he.workingToColorSpace(ke.copy(this),e);const i=ke.r,r=ke.g,o=ke.b,s=Math.max(i,r,o),a=Math.min(i,r,o);let l,c;const d=(a+s)/2;if(a===s)l=0,c=0;else{const h=s-a;switch(c=d<=.5?h/(s+a):h/(2-s-a),s){case i:l=(r-o)/h+(r<o?6:0);break;case r:l=(o-i)/h+2;break;case o:l=(i-r)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=d,t}getRGB(t,e=he.workingColorSpace){return he.workingToColorSpace(ke.copy(this),e),t.r=ke.r,t.g=ke.g,t.b=ke.b,t}getStyle(t=hn){he.workingToColorSpace(ke.copy(this),t);const e=ke.r,i=ke.g,r=ke.b;return t!==hn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(Qn),this.setHSL(Qn.h+t,Qn.s+e,Qn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Qn),t.getHSL(po);const i=Ur(Qn.h,po.h,e),r=Ur(Qn.s,po.s,e),o=Ur(Qn.l,po.l,e);return this.setHSL(i,r,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,r=this.b,o=t.elements;return this.r=o[0]*e+o[3]*i+o[6]*r,this.g=o[1]*e+o[4]*i+o[7]*r,this.b=o[2]*e+o[5]*i+o[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ke=new ne;ne.NAMES=fh;let vd=0;class Ui extends mr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:vd++}),this.uuid=Ln(),this.name="",this.type="Material",this.blending=or,this.side=hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$s,this.blendDst=js,this.blendEquation=bi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ne(0,0,0),this.blendAlpha=0,this.depthFunc=lr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_l,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Bi,this.stencilZFail=Bi,this.stencilZPass=Bi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==or&&(i.blending=this.blending),this.side!==hi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==$s&&(i.blendSrc=this.blendSrc),this.blendDst!==js&&(i.blendDst=this.blendDst),this.blendEquation!==bi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==lr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==_l&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Bi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Bi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Bi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(o){const s=[];for(const a in o){const l=o[a];delete l.metadata,s.push(l)}return s}if(e){const o=r(t.textures),s=r(t.images);o.length>0&&(i.textures=o),s.length>0&&(i.images=s)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const r=e.length;i=new Array(r);for(let o=0;o!==r;++o)i[o]=e[o].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class il extends Ui{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Re,this.combine=$c,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ce=new E,mo=new vt;let Md=0;class En{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Md++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Ba,this.updateRanges=[],this.gpuType=Vn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,o=this.itemSize;r<o;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)mo.fromBufferAttribute(this,e),mo.applyMatrix3(t),this.setXY(e,mo.x,mo.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ce.fromBufferAttribute(this,e),Ce.applyMatrix3(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ce.fromBufferAttribute(this,e),Ce.applyMatrix4(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ce.fromBufferAttribute(this,e),Ce.applyNormalMatrix(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ce.fromBufferAttribute(this,e),Ce.transformDirection(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=yn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=fe(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=yn(e,this.array)),e}setX(t,e){return this.normalized&&(e=fe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=yn(e,this.array)),e}setY(t,e){return this.normalized&&(e=fe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=yn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=fe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=yn(e,this.array)),e}setW(t,e){return this.normalized&&(e=fe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=fe(e,this.array),i=fe(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=fe(e,this.array),i=fe(i,this.array),r=fe(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,o){return t*=this.itemSize,this.normalized&&(e=fe(e,this.array),i=fe(i,this.array),r=fe(r,this.array),o=fe(o,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ba&&(t.usage=this.usage),t}}class ph extends En{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class mh extends En{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class xe extends En{constructor(t,e,i){super(new Float32Array(t),e,i)}}let yd=0;const ln=new Me,Rs=new Ie,qi=new E,en=new eo,Sr=new eo,Fe=new E;class Se extends mr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:yd++}),this.uuid=Ln(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ch(t)?mh:ph)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const o=new Qt().getNormalMatrix(t);i.applyNormalMatrix(o),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return ln.makeRotationFromQuaternion(t),this.applyMatrix4(ln),this}rotateX(t){return ln.makeRotationX(t),this.applyMatrix4(ln),this}rotateY(t){return ln.makeRotationY(t),this.applyMatrix4(ln),this}rotateZ(t){return ln.makeRotationZ(t),this.applyMatrix4(ln),this}translate(t,e,i){return ln.makeTranslation(t,e,i),this.applyMatrix4(ln),this}scale(t,e,i){return ln.makeScale(t,e,i),this.applyMatrix4(ln),this}lookAt(t){return Rs.lookAt(t),Rs.updateMatrix(),this.applyMatrix4(Rs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qi).negate(),this.translate(qi.x,qi.y,qi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let r=0,o=t.length;r<o;r++){const s=t[r];i.push(s.x,s.y,s.z||0)}this.setAttribute("position",new xe(i,3))}else{const i=Math.min(t.length,e.count);for(let r=0;r<i;r++){const o=t[r];e.setXYZ(r,o.x,o.y,o.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new eo);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){const o=e[i];en.setFromBufferAttribute(o),this.morphTargetsRelative?(Fe.addVectors(this.boundingBox.min,en.min),this.boundingBox.expandByPoint(Fe),Fe.addVectors(this.boundingBox.max,en.max),this.boundingBox.expandByPoint(Fe)):(this.boundingBox.expandByPoint(en.min),this.boundingBox.expandByPoint(en.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new is);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new E,1/0);return}if(t){const i=this.boundingSphere.center;if(en.setFromBufferAttribute(t),e)for(let o=0,s=e.length;o<s;o++){const a=e[o];Sr.setFromBufferAttribute(a),this.morphTargetsRelative?(Fe.addVectors(en.min,Sr.min),en.expandByPoint(Fe),Fe.addVectors(en.max,Sr.max),en.expandByPoint(Fe)):(en.expandByPoint(Sr.min),en.expandByPoint(Sr.max))}en.getCenter(i);let r=0;for(let o=0,s=t.count;o<s;o++)Fe.fromBufferAttribute(t,o),r=Math.max(r,i.distanceToSquared(Fe));if(e)for(let o=0,s=e.length;o<s;o++){const a=e[o],l=this.morphTargetsRelative;for(let c=0,d=a.count;c<d;c++)Fe.fromBufferAttribute(a,c),l&&(qi.fromBufferAttribute(t,c),Fe.add(qi)),r=Math.max(r,i.distanceToSquared(Fe))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,r=e.normal,o=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new En(new Float32Array(4*i.count),4));const s=this.getAttribute("tangent"),a=[],l=[];for(let U=0;U<i.count;U++)a[U]=new E,l[U]=new E;const c=new E,d=new E,h=new E,f=new vt,m=new vt,x=new vt,v=new E,g=new E;function p(U,M,_){c.fromBufferAttribute(i,U),d.fromBufferAttribute(i,M),h.fromBufferAttribute(i,_),f.fromBufferAttribute(o,U),m.fromBufferAttribute(o,M),x.fromBufferAttribute(o,_),d.sub(c),h.sub(c),m.sub(f),x.sub(f);const u=1/(m.x*x.y-x.x*m.y);isFinite(u)&&(v.copy(d).multiplyScalar(x.y).addScaledVector(h,-m.y).multiplyScalar(u),g.copy(h).multiplyScalar(m.x).addScaledVector(d,-x.x).multiplyScalar(u),a[U].add(v),a[M].add(v),a[_].add(v),l[U].add(g),l[M].add(g),l[_].add(g))}let A=this.groups;A.length===0&&(A=[{start:0,count:t.count}]);for(let U=0,M=A.length;U<M;++U){const _=A[U],u=_.start,N=_.count;for(let O=u,k=u+N;O<k;O+=3)p(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const T=new E,y=new E,L=new E,b=new E;function C(U){L.fromBufferAttribute(r,U),b.copy(L);const M=a[U];T.copy(M),T.sub(L.multiplyScalar(L.dot(M))).normalize(),y.crossVectors(b,M);const u=y.dot(l[U])<0?-1:1;s.setXYZW(U,T.x,T.y,T.z,u)}for(let U=0,M=A.length;U<M;++U){const _=A[U],u=_.start,N=_.count;for(let O=u,k=u+N;O<k;O+=3)C(t.getX(O+0)),C(t.getX(O+1)),C(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new En(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,m=i.count;f<m;f++)i.setXYZ(f,0,0,0);const r=new E,o=new E,s=new E,a=new E,l=new E,c=new E,d=new E,h=new E;if(t)for(let f=0,m=t.count;f<m;f+=3){const x=t.getX(f+0),v=t.getX(f+1),g=t.getX(f+2);r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,v),s.fromBufferAttribute(e,g),d.subVectors(s,o),h.subVectors(r,o),d.cross(h),a.fromBufferAttribute(i,x),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,g),a.add(d),l.add(d),c.add(d),i.setXYZ(x,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,m=e.count;f<m;f+=3)r.fromBufferAttribute(e,f+0),o.fromBufferAttribute(e,f+1),s.fromBufferAttribute(e,f+2),d.subVectors(s,o),h.subVectors(r,o),d.cross(h),i.setXYZ(f+0,d.x,d.y,d.z),i.setXYZ(f+1,d.x,d.y,d.z),i.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Fe.fromBufferAttribute(t,e),Fe.normalize(),t.setXYZ(e,Fe.x,Fe.y,Fe.z)}toNonIndexed(){function t(a,l){const c=a.array,d=a.itemSize,h=a.normalized,f=new c.constructor(l.length*d);let m=0,x=0;for(let v=0,g=l.length;v<g;v++){a.isInterleavedBufferAttribute?m=l[v]*a.data.stride+a.offset:m=l[v]*d;for(let p=0;p<d;p++)f[x++]=c[m++]}return new En(f,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Se,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=t(l,i);e.setAttribute(a,c)}const o=this.morphAttributes;for(const a in o){const l=[],c=o[a];for(let d=0,h=c.length;d<h;d++){const f=c[d],m=t(f,i);l.push(m)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let a=0,l=s.length;a<l;a++){const c=s[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let o=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,f=c.length;h<f;h++){const m=c[h];d.push(m.toJSON(t.data))}d.length>0&&(r[l]=d,o=!0)}o&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(t.data.groups=JSON.parse(JSON.stringify(s)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const r=t.attributes;for(const c in r){const d=r[c];this.setAttribute(c,d.clone(e))}const o=t.morphAttributes;for(const c in o){const d=[],h=o[c];for(let f=0,m=h.length;f<m;f++)d.push(h[f].clone(e));this.morphAttributes[c]=d}this.morphTargetsRelative=t.morphTargetsRelative;const s=t.groups;for(let c=0,d=s.length;c<d;c++){const h=s[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Dl=new Me,xi=new uh,go=new is,Il=new E,_o=new E,xo=new E,vo=new E,Cs=new E,Mo=new E,Ul=new E,yo=new E;class Ae extends Ie{constructor(t=new Se,e=new il){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=r.length;o<s;o++){const a=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(t,e){const i=this.geometry,r=i.attributes.position,o=i.morphAttributes.position,s=i.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(o&&a){Mo.set(0,0,0);for(let l=0,c=o.length;l<c;l++){const d=a[l],h=o[l];d!==0&&(Cs.fromBufferAttribute(h,t),s?Mo.addScaledVector(Cs,d):Mo.addScaledVector(Cs.sub(e),d))}e.add(Mo)}return e}raycast(t,e){const i=this.geometry,r=this.material,o=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),go.copy(i.boundingSphere),go.applyMatrix4(o),xi.copy(t.ray).recast(t.near),!(go.containsPoint(xi.origin)===!1&&(xi.intersectSphere(go,Il)===null||xi.origin.distanceToSquared(Il)>(t.far-t.near)**2))&&(Dl.copy(o).invert(),xi.copy(t.ray).applyMatrix4(Dl),!(i.boundingBox!==null&&xi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,xi)))}_computeIntersections(t,e,i){let r;const o=this.geometry,s=this.material,a=o.index,l=o.attributes.position,c=o.attributes.uv,d=o.attributes.uv1,h=o.attributes.normal,f=o.groups,m=o.drawRange;if(a!==null)if(Array.isArray(s))for(let x=0,v=f.length;x<v;x++){const g=f[x],p=s[g.materialIndex],A=Math.max(g.start,m.start),T=Math.min(a.count,Math.min(g.start+g.count,m.start+m.count));for(let y=A,L=T;y<L;y+=3){const b=a.getX(y),C=a.getX(y+1),U=a.getX(y+2);r=So(this,p,t,i,c,d,h,b,C,U),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=g.materialIndex,e.push(r))}}else{const x=Math.max(0,m.start),v=Math.min(a.count,m.start+m.count);for(let g=x,p=v;g<p;g+=3){const A=a.getX(g),T=a.getX(g+1),y=a.getX(g+2);r=So(this,s,t,i,c,d,h,A,T,y),r&&(r.faceIndex=Math.floor(g/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(s))for(let x=0,v=f.length;x<v;x++){const g=f[x],p=s[g.materialIndex],A=Math.max(g.start,m.start),T=Math.min(l.count,Math.min(g.start+g.count,m.start+m.count));for(let y=A,L=T;y<L;y+=3){const b=y,C=y+1,U=y+2;r=So(this,p,t,i,c,d,h,b,C,U),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=g.materialIndex,e.push(r))}}else{const x=Math.max(0,m.start),v=Math.min(l.count,m.start+m.count);for(let g=x,p=v;g<p;g+=3){const A=g,T=g+1,y=g+2;r=So(this,s,t,i,c,d,h,A,T,y),r&&(r.faceIndex=Math.floor(g/3),e.push(r))}}}}function Sd(n,t,e,i,r,o,s,a){let l;if(t.side===Qe?l=i.intersectTriangle(s,o,r,!0,a):l=i.intersectTriangle(r,o,s,t.side===hi,a),l===null)return null;yo.copy(a),yo.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(yo);return c<e.near||c>e.far?null:{distance:c,point:yo.clone(),object:n}}function So(n,t,e,i,r,o,s,a,l,c){n.getVertexPosition(a,_o),n.getVertexPosition(l,xo),n.getVertexPosition(c,vo);const d=Sd(n,t,e,i,_o,xo,vo,Ul);if(d){const h=new E;un.getBarycoord(Ul,_o,xo,vo,h),r&&(d.uv=un.getInterpolatedAttribute(r,a,l,c,h,new vt)),o&&(d.uv1=un.getInterpolatedAttribute(o,a,l,c,h,new vt)),s&&(d.normal=un.getInterpolatedAttribute(s,a,l,c,h,new E),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new E,materialIndex:0};un.getNormal(_o,xo,vo,f.normal),d.face=f,d.barycoord=h}return d}class Pe extends Se{constructor(t=1,e=1,i=1,r=1,o=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:o,depthSegments:s};const a=this;r=Math.floor(r),o=Math.floor(o),s=Math.floor(s);const l=[],c=[],d=[],h=[];let f=0,m=0;x("z","y","x",-1,-1,i,e,t,s,o,0),x("z","y","x",1,-1,i,e,-t,s,o,1),x("x","z","y",1,1,t,i,e,r,s,2),x("x","z","y",1,-1,t,i,-e,r,s,3),x("x","y","z",1,-1,t,e,i,r,o,4),x("x","y","z",-1,-1,t,e,-i,r,o,5),this.setIndex(l),this.setAttribute("position",new xe(c,3)),this.setAttribute("normal",new xe(d,3)),this.setAttribute("uv",new xe(h,2));function x(v,g,p,A,T,y,L,b,C,U,M){const _=y/C,u=L/U,N=y/2,O=L/2,k=b/2,H=C+1,G=U+1;let Z=0,V=0;const et=new E;for(let rt=0;rt<G;rt++){const ht=rt*u-O;for(let Rt=0;Rt<H;Rt++){const Gt=Rt*_-N;et[v]=Gt*A,et[g]=ht*T,et[p]=k,c.push(et.x,et.y,et.z),et[v]=0,et[g]=0,et[p]=b>0?1:-1,d.push(et.x,et.y,et.z),h.push(Rt/C),h.push(1-rt/U),Z+=1}}for(let rt=0;rt<U;rt++)for(let ht=0;ht<C;ht++){const Rt=f+ht+H*rt,Gt=f+ht+H*(rt+1),Yt=f+(ht+1)+H*(rt+1),Dt=f+(ht+1)+H*rt;l.push(Rt,Gt,Dt),l.push(Gt,Yt,Dt),V+=6}a.addGroup(m,V,M),m+=V,f+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pe(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function dr(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const r=n[e][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone():Array.isArray(r)?t[e][i]=r.slice():t[e][i]=r}}return t}function Xe(n){const t={};for(let e=0;e<n.length;e++){const i=dr(n[e]);for(const r in i)t[r]=i[r]}return t}function Td(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function gh(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:he.workingColorSpace}const Ed={clone:dr,merge:Xe};var bd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,wd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ui extends Ui{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=bd,this.fragmentShader=wd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=dr(t.uniforms),this.uniformsGroups=Td(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const s=this.uniforms[r].value;s&&s.isTexture?e.uniforms[r]={type:"t",value:s.toJSON(t).uuid}:s&&s.isColor?e.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?e.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?e.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?e.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?e.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?e.uniforms[r]={type:"m4",value:s.toArray()}:e.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class _h extends Ie{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Me,this.projectionMatrix=new Me,this.projectionMatrixInverse=new Me,this.coordinateSystem=Pn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ti=new E,Nl=new vt,Fl=new vt;class nn extends _h{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Xr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ir*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Xr*2*Math.atan(Math.tan(Ir*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){ti.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ti.x,ti.y).multiplyScalar(-t/ti.z),ti.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ti.x,ti.y).multiplyScalar(-t/ti.z)}getViewSize(t,e){return this.getViewBounds(t,Nl,Fl),e.subVectors(Fl,Nl)}setViewOffset(t,e,i,r,o,s){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ir*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,o=-.5*r;const s=this.view;if(this.view!==null&&this.view.enabled){const l=s.fullWidth,c=s.fullHeight;o+=s.offsetX*r/l,e-=s.offsetY*i/c,r*=s.width/l,i*=s.height/c}const a=this.filmOffset;a!==0&&(o+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+r,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ki=-90,Ji=1;class Ad extends Ie{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new nn(Ki,Ji,t,e);r.layers=this.layers,this.add(r);const o=new nn(Ki,Ji,t,e);o.layers=this.layers,this.add(o);const s=new nn(Ki,Ji,t,e);s.layers=this.layers,this.add(s);const a=new nn(Ki,Ji,t,e);a.layers=this.layers,this.add(a);const l=new nn(Ki,Ji,t,e);l.layers=this.layers,this.add(l);const c=new nn(Ki,Ji,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,r,o,s,a,l]=e;for(const c of e)this.remove(c);if(t===Pn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Zo)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,s,a,l,c,d]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(e,o),t.setRenderTarget(i,1,r),t.render(e,s),t.setRenderTarget(i,2,r),t.render(e,a),t.setRenderTarget(i,3,r),t.render(e,l),t.setRenderTarget(i,4,r),t.render(e,c),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,r),t.render(e,d),t.setRenderTarget(h,f,m),t.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class xh extends Ye{constructor(t=[],e=cr,i,r,o,s,a,l,c,d){super(t,e,i,r,o,s,a,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Rd extends Di{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new xh(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Pe(5,5,5),o=new ui({name:"CubemapFromEquirect",uniforms:dr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Qe,blending:ai});o.uniforms.tEquirect.value=e;const s=new Ae(r,o),a=e.minFilter;return e.minFilter===Ci&&(e.minFilter=Cn),new Ad(1,10,this).update(t,s),e.minFilter=a,s.geometry.dispose(),s.material.dispose(),this}clear(t,e=!0,i=!0,r=!0){const o=t.getRenderTarget();for(let s=0;s<6;s++)t.setRenderTarget(this,s),t.clear(e,i,r);t.setRenderTarget(o)}}class te extends Ie{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Cd={type:"move"};class Ps{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new te,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new te,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new E,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new E),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new te,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new E,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new E),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,o=null,s=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){s=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,i),p=this._getHandJoint(c,v);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=d.position.distanceTo(h.position),m=.02,x=.005;c.inputState.pinching&&f>m+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=m-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,i),o!==null&&(l.matrix.fromArray(o.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,o.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(o.linearVelocity)):l.hasLinearVelocity=!1,o.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(o.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&o!==null&&(r=o),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Cd)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=o!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new te;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class rl{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new ne(t),this.near=e,this.far=i}clone(){return new rl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Pd extends Ie{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Re,this.environmentIntensity=1,this.environmentRotation=new Re,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Ld{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ba,this.updateRanges=[],this.version=0,this.uuid=Ln()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let r=0,o=this.stride;r<o;r++)this.array[t+r]=e.array[i+r];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ln()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ln()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const We=new E;class qo{constructor(t,e,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)We.fromBufferAttribute(this,e),We.applyMatrix4(t),this.setXYZ(e,We.x,We.y,We.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)We.fromBufferAttribute(this,e),We.applyNormalMatrix(t),this.setXYZ(e,We.x,We.y,We.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)We.fromBufferAttribute(this,e),We.transformDirection(t),this.setXYZ(e,We.x,We.y,We.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=yn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=fe(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=fe(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=fe(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=fe(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=fe(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=yn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=yn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=yn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=yn(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=fe(e,this.array),i=fe(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=fe(e,this.array),i=fe(i,this.array),r=fe(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=r,this}setXYZW(t,e,i,r,o){return t=t*this.data.stride+this.offset,this.normalized&&(e=fe(e,this.array),i=fe(i,this.array),r=fe(r,this.array),o=fe(o,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=r,this.data.array[t+3]=o,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)e.push(this.data.array[r+o])}return new En(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new qo(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)e.push(this.data.array[r+o])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class vh extends Ui{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ne(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let $i;const Tr=new E,ji=new E,Qi=new E,tr=new vt,Er=new vt,Mh=new Me,To=new E,br=new E,Eo=new E,Ol=new vt,Ls=new vt,Bl=new vt;class Dd extends Ie{constructor(t=new vh){if(super(),this.isSprite=!0,this.type="Sprite",$i===void 0){$i=new Se;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Ld(e,5);$i.setIndex([0,1,2,0,2,3]),$i.setAttribute("position",new qo(i,3,0,!1)),$i.setAttribute("uv",new qo(i,2,3,!1))}this.geometry=$i,this.material=t,this.center=new vt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ji.setFromMatrixScale(this.matrixWorld),Mh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Qi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ji.multiplyScalar(-Qi.z);const i=this.material.rotation;let r,o;i!==0&&(o=Math.cos(i),r=Math.sin(i));const s=this.center;bo(To.set(-.5,-.5,0),Qi,s,ji,r,o),bo(br.set(.5,-.5,0),Qi,s,ji,r,o),bo(Eo.set(.5,.5,0),Qi,s,ji,r,o),Ol.set(0,0),Ls.set(1,0),Bl.set(1,1);let a=t.ray.intersectTriangle(To,br,Eo,!1,Tr);if(a===null&&(bo(br.set(-.5,.5,0),Qi,s,ji,r,o),Ls.set(0,1),a=t.ray.intersectTriangle(To,Eo,br,!1,Tr),a===null))return;const l=t.ray.origin.distanceTo(Tr);l<t.near||l>t.far||e.push({distance:l,point:Tr.clone(),uv:un.getInterpolation(Tr,To,br,Eo,Ol,Ls,Bl,new vt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function bo(n,t,e,i,r,o){tr.subVectors(n,e).addScalar(.5).multiply(i),r!==void 0?(Er.x=o*tr.x-r*tr.y,Er.y=r*tr.x+o*tr.y):Er.copy(tr),n.copy(t),n.x+=Er.x,n.y+=Er.y,n.applyMatrix4(Mh)}const Ds=new E,Id=new E,Ud=new Qt;class Si{constructor(t=new E(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const r=Ds.subVectors(i,e).cross(Id.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Ds),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return o<0||o>1?null:e.copy(t.start).addScaledVector(i,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Ud.getNormalMatrix(t),r=this.coplanarPoint(Ds).applyMatrix4(t),o=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const vi=new is,Nd=new vt(.5,.5),wo=new E;class ol{constructor(t=new Si,e=new Si,i=new Si,r=new Si,o=new Si,s=new Si){this.planes=[t,e,i,r,o,s]}set(t,e,i,r,o,s){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(r),a[4].copy(o),a[5].copy(s),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Pn,i=!1){const r=this.planes,o=t.elements,s=o[0],a=o[1],l=o[2],c=o[3],d=o[4],h=o[5],f=o[6],m=o[7],x=o[8],v=o[9],g=o[10],p=o[11],A=o[12],T=o[13],y=o[14],L=o[15];if(r[0].setComponents(c-s,m-d,p-x,L-A).normalize(),r[1].setComponents(c+s,m+d,p+x,L+A).normalize(),r[2].setComponents(c+a,m+h,p+v,L+T).normalize(),r[3].setComponents(c-a,m-h,p-v,L-T).normalize(),i)r[4].setComponents(l,f,g,y).normalize(),r[5].setComponents(c-l,m-f,p-g,L-y).normalize();else if(r[4].setComponents(c-l,m-f,p-g,L-y).normalize(),e===Pn)r[5].setComponents(c+l,m+f,p+g,L+y).normalize();else if(e===Zo)r[5].setComponents(l,f,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),vi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),vi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(vi)}intersectsSprite(t){vi.center.set(0,0,0);const e=Nd.distanceTo(t.center);return vi.radius=.7071067811865476+e,vi.applyMatrix4(t.matrixWorld),this.intersectsSphere(vi)}intersectsSphere(t){const e=this.planes,i=t.center,r=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const r=e[i];if(wo.x=r.normal.x>0?t.max.x:t.min.x,wo.y=r.normal.y>0?t.max.y:t.min.y,wo.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(wo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class za extends Ui{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ne(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Ko=new E,Jo=new E,zl=new Me,wr=new uh,Ao=new is,Is=new E,kl=new E;class ei extends Ie{constructor(t=new Se,e=new za){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let r=1,o=e.count;r<o;r++)Ko.fromBufferAttribute(e,r-1),Jo.fromBufferAttribute(e,r),i[r]=i[r-1],i[r]+=Ko.distanceTo(Jo);t.setAttribute("lineDistance",new xe(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,r=this.matrixWorld,o=t.params.Line.threshold,s=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ao.copy(i.boundingSphere),Ao.applyMatrix4(r),Ao.radius+=o,t.ray.intersectsSphere(Ao)===!1)return;zl.copy(r).invert(),wr.copy(t.ray).applyMatrix4(zl);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,d=i.index,f=i.attributes.position;if(d!==null){const m=Math.max(0,s.start),x=Math.min(d.count,s.start+s.count);for(let v=m,g=x-1;v<g;v+=c){const p=d.getX(v),A=d.getX(v+1),T=Ro(this,t,wr,l,p,A,v);T&&e.push(T)}if(this.isLineLoop){const v=d.getX(x-1),g=d.getX(m),p=Ro(this,t,wr,l,v,g,x-1);p&&e.push(p)}}else{const m=Math.max(0,s.start),x=Math.min(f.count,s.start+s.count);for(let v=m,g=x-1;v<g;v+=c){const p=Ro(this,t,wr,l,v,v+1,v);p&&e.push(p)}if(this.isLineLoop){const v=Ro(this,t,wr,l,x-1,m,x-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=r.length;o<s;o++){const a=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function Ro(n,t,e,i,r,o,s){const a=n.geometry.attributes.position;if(Ko.fromBufferAttribute(a,r),Jo.fromBufferAttribute(a,o),e.distanceSqToSegment(Ko,Jo,Is,kl)>i)return;Is.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Is);if(!(c<t.near||c>t.far))return{distance:c,point:kl.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}class yh extends Ye{constructor(t,e,i,r,o,s,a,l,c){super(t,e,i,r,o,s,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Sh extends Ye{constructor(t,e,i=Li,r,o,s,a=Tn,l=Tn,c,d=Gr,h=1){if(d!==Gr&&d!==Wr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:h};super(f,r,o,s,a,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new nl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Th extends Ye{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class je extends Se{constructor(t=1,e=1,i=4,r=8,o=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:i,radialSegments:r,heightSegments:o},e=Math.max(0,e),i=Math.max(1,Math.floor(i)),r=Math.max(3,Math.floor(r)),o=Math.max(1,Math.floor(o));const s=[],a=[],l=[],c=[],d=e/2,h=Math.PI/2*t,f=e,m=2*h+f,x=i*2+o,v=r+1,g=new E,p=new E;for(let A=0;A<=x;A++){let T=0,y=0,L=0,b=0;if(A<=i){const M=A/i,_=M*Math.PI/2;y=-d-t*Math.cos(_),L=t*Math.sin(_),b=-t*Math.cos(_),T=M*h}else if(A<=i+o){const M=(A-i)/o;y=-d+M*e,L=t,b=0,T=h+M*f}else{const M=(A-i-o)/i,_=M*Math.PI/2;y=d+t*Math.sin(_),L=t*Math.cos(_),b=t*Math.sin(_),T=h+f+M*h}const C=Math.max(0,Math.min(1,T/m));let U=0;A===0?U=.5/r:A===x&&(U=-.5/r);for(let M=0;M<=r;M++){const _=M/r,u=_*Math.PI*2,N=Math.sin(u),O=Math.cos(u);p.x=-L*O,p.y=y,p.z=L*N,a.push(p.x,p.y,p.z),g.set(-L*O,b,L*N),g.normalize(),l.push(g.x,g.y,g.z),c.push(_+U,C)}if(A>0){const M=(A-1)*v;for(let _=0;_<r;_++){const u=M+_,N=M+_+1,O=A*v+_,k=A*v+_+1;s.push(u,N,O),s.push(N,k,O)}}}this.setIndex(s),this.setAttribute("position",new xe(a,3)),this.setAttribute("normal",new xe(l,3)),this.setAttribute("uv",new xe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new je(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class Yr extends Se{constructor(t=1,e=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:r},e=Math.max(3,e);const o=[],s=[],a=[],l=[],c=new E,d=new vt;s.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,f=3;h<=e;h++,f+=3){const m=i+h/e*r;c.x=t*Math.cos(m),c.y=t*Math.sin(m),s.push(c.x,c.y,c.z),a.push(0,0,1),d.x=(s[f]/t+1)/2,d.y=(s[f+1]/t+1)/2,l.push(d.x,d.y)}for(let h=1;h<=e;h++)o.push(h,h+1,0);this.setIndex(o),this.setAttribute("position",new xe(s,3)),this.setAttribute("normal",new xe(a,3)),this.setAttribute("uv",new xe(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yr(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Le extends Se{constructor(t=1,e=1,i=1,r=32,o=1,s=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:r,heightSegments:o,openEnded:s,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),o=Math.floor(o);const d=[],h=[],f=[],m=[];let x=0;const v=[],g=i/2;let p=0;A(),s===!1&&(t>0&&T(!0),e>0&&T(!1)),this.setIndex(d),this.setAttribute("position",new xe(h,3)),this.setAttribute("normal",new xe(f,3)),this.setAttribute("uv",new xe(m,2));function A(){const y=new E,L=new E;let b=0;const C=(e-t)/i;for(let U=0;U<=o;U++){const M=[],_=U/o,u=_*(e-t)+t;for(let N=0;N<=r;N++){const O=N/r,k=O*l+a,H=Math.sin(k),G=Math.cos(k);L.x=u*H,L.y=-_*i+g,L.z=u*G,h.push(L.x,L.y,L.z),y.set(H,C,G).normalize(),f.push(y.x,y.y,y.z),m.push(O,1-_),M.push(x++)}v.push(M)}for(let U=0;U<r;U++)for(let M=0;M<o;M++){const _=v[M][U],u=v[M+1][U],N=v[M+1][U+1],O=v[M][U+1];(t>0||M!==0)&&(d.push(_,u,O),b+=3),(e>0||M!==o-1)&&(d.push(u,N,O),b+=3)}c.addGroup(p,b,0),p+=b}function T(y){const L=x,b=new vt,C=new E;let U=0;const M=y===!0?t:e,_=y===!0?1:-1;for(let N=1;N<=r;N++)h.push(0,g*_,0),f.push(0,_,0),m.push(.5,.5),x++;const u=x;for(let N=0;N<=r;N++){const k=N/r*l+a,H=Math.cos(k),G=Math.sin(k);C.x=M*G,C.y=g*_,C.z=M*H,h.push(C.x,C.y,C.z),f.push(0,_,0),b.x=H*.5+.5,b.y=G*.5*_+.5,m.push(b.x,b.y),x++}for(let N=0;N<r;N++){const O=L+N,k=u+N;y===!0?d.push(k,k+1,O):d.push(k+1,k,O),U+=3}c.addGroup(p,U,y===!0?1:2),p+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Le(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class In{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,r=this.getPoint(0),o=0;e.push(0);for(let s=1;s<=t;s++)i=this.getPoint(s/t),o+=i.distanceTo(r),e.push(o),r=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const i=this.getLengths();let r=0;const o=i.length;let s;e?s=e:s=t*i[o-1];let a=0,l=o-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-s,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===s)return r/(o-1);const d=i[r],f=i[r+1]-d,m=(s-d)/f;return(r+m)/(o-1)}getTangent(t,e){let r=t-1e-4,o=t+1e-4;r<0&&(r=0),o>1&&(o=1);const s=this.getPoint(r),a=this.getPoint(o),l=e||(s.isVector2?new vt:new E);return l.copy(a).sub(s).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){const i=new E,r=[],o=[],s=[],a=new E,l=new Me;for(let m=0;m<=t;m++){const x=m/t;r[m]=this.getTangentAt(x,new E)}o[0]=new E,s[0]=new E;let c=Number.MAX_VALUE;const d=Math.abs(r[0].x),h=Math.abs(r[0].y),f=Math.abs(r[0].z);d<=c&&(c=d,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),f<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),o[0].crossVectors(r[0],a),s[0].crossVectors(r[0],o[0]);for(let m=1;m<=t;m++){if(o[m]=o[m-1].clone(),s[m]=s[m-1].clone(),a.crossVectors(r[m-1],r[m]),a.length()>Number.EPSILON){a.normalize();const x=Math.acos(re(r[m-1].dot(r[m]),-1,1));o[m].applyMatrix4(l.makeRotationAxis(a,x))}s[m].crossVectors(r[m],o[m])}if(e===!0){let m=Math.acos(re(o[0].dot(o[t]),-1,1));m/=t,r[0].dot(a.crossVectors(o[0],o[t]))>0&&(m=-m);for(let x=1;x<=t;x++)o[x].applyMatrix4(l.makeRotationAxis(r[x],m*x)),s[x].crossVectors(r[x],o[x])}return{tangents:r,normals:o,binormals:s}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class sl extends In{constructor(t=0,e=0,i=1,r=1,o=0,s=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=r,this.aStartAngle=o,this.aEndAngle=s,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new vt){const i=e,r=Math.PI*2;let o=this.aEndAngle-this.aStartAngle;const s=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=r;for(;o>r;)o-=r;o<Number.EPSILON&&(s?o=0:o=r),this.aClockwise===!0&&!s&&(o===r?o=-r:o=o-r);const a=this.aStartAngle+t*o;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const d=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,m=c-this.aY;l=f*d-m*h+this.aX,c=f*h+m*d+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Fd extends sl{constructor(t,e,i,r,o,s){super(t,e,i,i,r,o,s),this.isArcCurve=!0,this.type="ArcCurve"}}function al(){let n=0,t=0,e=0,i=0;function r(o,s,a,l){n=o,t=a,e=-3*o+3*s-2*a-l,i=2*o-2*s+a+l}return{initCatmullRom:function(o,s,a,l,c){r(s,a,c*(a-o),c*(l-s))},initNonuniformCatmullRom:function(o,s,a,l,c,d,h){let f=(s-o)/c-(a-o)/(c+d)+(a-s)/d,m=(a-s)/d-(l-s)/(d+h)+(l-a)/h;f*=d,m*=d,r(s,a,f,m)},calc:function(o){const s=o*o,a=s*o;return n+t*o+e*s+i*a}}}const Co=new E,Us=new al,Ns=new al,Fs=new al;class Od extends In{constructor(t=[],e=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=r}getPoint(t,e=new E){const i=e,r=this.points,o=r.length,s=(o-(this.closed?0:1))*t;let a=Math.floor(s),l=s-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/o)+1)*o:l===0&&a===o-1&&(a=o-2,l=1);let c,d;this.closed||a>0?c=r[(a-1)%o]:(Co.subVectors(r[0],r[1]).add(r[0]),c=Co);const h=r[a%o],f=r[(a+1)%o];if(this.closed||a+2<o?d=r[(a+2)%o]:(Co.subVectors(r[o-1],r[o-2]).add(r[o-1]),d=Co),this.curveType==="centripetal"||this.curveType==="chordal"){const m=this.curveType==="chordal"?.5:.25;let x=Math.pow(c.distanceToSquared(h),m),v=Math.pow(h.distanceToSquared(f),m),g=Math.pow(f.distanceToSquared(d),m);v<1e-4&&(v=1),x<1e-4&&(x=v),g<1e-4&&(g=v),Us.initNonuniformCatmullRom(c.x,h.x,f.x,d.x,x,v,g),Ns.initNonuniformCatmullRom(c.y,h.y,f.y,d.y,x,v,g),Fs.initNonuniformCatmullRom(c.z,h.z,f.z,d.z,x,v,g)}else this.curveType==="catmullrom"&&(Us.initCatmullRom(c.x,h.x,f.x,d.x,this.tension),Ns.initCatmullRom(c.y,h.y,f.y,d.y,this.tension),Fs.initCatmullRom(c.z,h.z,f.z,d.z,this.tension));return i.set(Us.calc(l),Ns.calc(l),Fs.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(r.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const r=this.points[e];t.points.push(r.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(new E().fromArray(r))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Hl(n,t,e,i,r){const o=(i-t)*.5,s=(r-e)*.5,a=n*n,l=n*a;return(2*e-2*i+o+s)*l+(-3*e+3*i-2*o-s)*a+o*n+e}function Bd(n,t){const e=1-n;return e*e*t}function zd(n,t){return 2*(1-n)*n*t}function kd(n,t){return n*n*t}function Nr(n,t,e,i){return Bd(n,t)+zd(n,e)+kd(n,i)}function Hd(n,t){const e=1-n;return e*e*e*t}function Vd(n,t){const e=1-n;return 3*e*e*n*t}function Gd(n,t){return 3*(1-n)*n*n*t}function Wd(n,t){return n*n*n*t}function Fr(n,t,e,i,r){return Hd(n,t)+Vd(n,e)+Gd(n,i)+Wd(n,r)}class Eh extends In{constructor(t=new vt,e=new vt,i=new vt,r=new vt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=r}getPoint(t,e=new vt){const i=e,r=this.v0,o=this.v1,s=this.v2,a=this.v3;return i.set(Fr(t,r.x,o.x,s.x,a.x),Fr(t,r.y,o.y,s.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Xd extends In{constructor(t=new E,e=new E,i=new E,r=new E){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=r}getPoint(t,e=new E){const i=e,r=this.v0,o=this.v1,s=this.v2,a=this.v3;return i.set(Fr(t,r.x,o.x,s.x,a.x),Fr(t,r.y,o.y,s.y,a.y),Fr(t,r.z,o.z,s.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class bh extends In{constructor(t=new vt,e=new vt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new vt){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new vt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Zd extends In{constructor(t=new E,e=new E){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new E){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new E){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class wh extends In{constructor(t=new vt,e=new vt,i=new vt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new vt){const i=e,r=this.v0,o=this.v1,s=this.v2;return i.set(Nr(t,r.x,o.x,s.x),Nr(t,r.y,o.y,s.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Yd extends In{constructor(t=new E,e=new E,i=new E){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new E){const i=e,r=this.v0,o=this.v1,s=this.v2;return i.set(Nr(t,r.x,o.x,s.x),Nr(t,r.y,o.y,s.y),Nr(t,r.z,o.z,s.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ah extends In{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new vt){const i=e,r=this.points,o=(r.length-1)*t,s=Math.floor(o),a=o-s,l=r[s===0?s:s-1],c=r[s],d=r[s>r.length-2?r.length-1:s+1],h=r[s>r.length-3?r.length-1:s+2];return i.set(Hl(a,l.x,c.x,d.x,h.x),Hl(a,l.y,c.y,d.y,h.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const r=this.points[e];t.points.push(r.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(new vt().fromArray(r))}return this}}var Vl=Object.freeze({__proto__:null,ArcCurve:Fd,CatmullRomCurve3:Od,CubicBezierCurve:Eh,CubicBezierCurve3:Xd,EllipseCurve:sl,LineCurve:bh,LineCurve3:Zd,QuadraticBezierCurve:wh,QuadraticBezierCurve3:Yd,SplineCurve:Ah});class qd extends In{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Vl[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),r=this.getCurveLengths();let o=0;for(;o<r.length;){if(r[o]>=i){const s=r[o]-i,a=this.curves[o],l=a.getLength(),c=l===0?0:1-s/l;return a.getPointAt(c,e)}o++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,r=this.curves.length;i<r;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let r=0,o=this.curves;r<o.length;r++){const s=o[r],a=s.isEllipseCurve?t*2:s.isLineCurve||s.isLineCurve3?1:s.isSplineCurve?t*s.points.length:t,l=s.getPoints(a);for(let c=0;c<l.length;c++){const d=l[c];i&&i.equals(d)||(e.push(d),i=d)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const r=t.curves[e];this.curves.push(r.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const r=this.curves[e];t.curves.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const r=t.curves[e];this.curves.push(new Vl[r.type]().fromJSON(r))}return this}}class ka extends qd{constructor(t){super(),this.type="Path",this.currentPoint=new vt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new bh(this.currentPoint.clone(),new vt(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,r){const o=new wh(this.currentPoint.clone(),new vt(t,e),new vt(i,r));return this.curves.push(o),this.currentPoint.set(i,r),this}bezierCurveTo(t,e,i,r,o,s){const a=new Eh(this.currentPoint.clone(),new vt(t,e),new vt(i,r),new vt(o,s));return this.curves.push(a),this.currentPoint.set(o,s),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new Ah(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,r,o,s){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,i,r,o,s),this}absarc(t,e,i,r,o,s){return this.absellipse(t,e,i,i,r,o,s),this}ellipse(t,e,i,r,o,s,a,l){const c=this.currentPoint.x,d=this.currentPoint.y;return this.absellipse(t+c,e+d,i,r,o,s,a,l),this}absellipse(t,e,i,r,o,s,a,l){const c=new sl(t,e,i,r,o,s,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const d=c.getPoint(1);return this.currentPoint.copy(d),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Rh extends ka{constructor(t){super(t),this.uuid=Ln(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,r=this.holes.length;i<r;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const r=t.holes[e];this.holes.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const r=this.holes[e];t.holes.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const r=t.holes[e];this.holes.push(new ka().fromJSON(r))}return this}}function Kd(n,t,e=2){const i=t&&t.length,r=i?t[0]*e:n.length;let o=Ch(n,0,r,e,!0);const s=[];if(!o||o.next===o.prev)return s;let a,l,c;if(i&&(o=tf(n,t,o,e)),n.length>80*e){a=1/0,l=1/0;let d=-1/0,h=-1/0;for(let f=e;f<r;f+=e){const m=n[f],x=n[f+1];m<a&&(a=m),x<l&&(l=x),m>d&&(d=m),x>h&&(h=x)}c=Math.max(d-a,h-l),c=c!==0?32767/c:0}return qr(o,s,e,a,l,c,0),s}function Ch(n,t,e,i,r){let o;if(r===df(n,t,e,i)>0)for(let s=t;s<e;s+=i)o=Gl(s/i|0,n[s],n[s+1],o);else for(let s=e-i;s>=t;s-=i)o=Gl(s/i|0,n[s],n[s+1],o);return o&&fr(o,o.next)&&(Jr(o),o=o.next),o}function Ii(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(fr(e,e.next)||Te(e.prev,e,e.next)===0)){if(Jr(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function qr(n,t,e,i,r,o,s){if(!n)return;!s&&o&&sf(n,i,r,o);let a=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(o?$d(n,i,r,o):Jd(n)){t.push(l.i,n.i,c.i),Jr(n),n=c.next,a=c.next;continue}if(n=c,n===a){s?s===1?(n=jd(Ii(n),t),qr(n,t,e,i,r,o,2)):s===2&&Qd(n,t,e,i,r,o):qr(Ii(n),t,e,i,r,o,1);break}}}function Jd(n){const t=n.prev,e=n,i=n.next;if(Te(t,e,i)>=0)return!1;const r=t.x,o=e.x,s=i.x,a=t.y,l=e.y,c=i.y,d=Math.min(r,o,s),h=Math.min(a,l,c),f=Math.max(r,o,s),m=Math.max(a,l,c);let x=i.next;for(;x!==t;){if(x.x>=d&&x.x<=f&&x.y>=h&&x.y<=m&&Lr(r,a,o,l,s,c,x.x,x.y)&&Te(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function $d(n,t,e,i){const r=n.prev,o=n,s=n.next;if(Te(r,o,s)>=0)return!1;const a=r.x,l=o.x,c=s.x,d=r.y,h=o.y,f=s.y,m=Math.min(a,l,c),x=Math.min(d,h,f),v=Math.max(a,l,c),g=Math.max(d,h,f),p=Ha(m,x,t,e,i),A=Ha(v,g,t,e,i);let T=n.prevZ,y=n.nextZ;for(;T&&T.z>=p&&y&&y.z<=A;){if(T.x>=m&&T.x<=v&&T.y>=x&&T.y<=g&&T!==r&&T!==s&&Lr(a,d,l,h,c,f,T.x,T.y)&&Te(T.prev,T,T.next)>=0||(T=T.prevZ,y.x>=m&&y.x<=v&&y.y>=x&&y.y<=g&&y!==r&&y!==s&&Lr(a,d,l,h,c,f,y.x,y.y)&&Te(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;T&&T.z>=p;){if(T.x>=m&&T.x<=v&&T.y>=x&&T.y<=g&&T!==r&&T!==s&&Lr(a,d,l,h,c,f,T.x,T.y)&&Te(T.prev,T,T.next)>=0)return!1;T=T.prevZ}for(;y&&y.z<=A;){if(y.x>=m&&y.x<=v&&y.y>=x&&y.y<=g&&y!==r&&y!==s&&Lr(a,d,l,h,c,f,y.x,y.y)&&Te(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function jd(n,t){let e=n;do{const i=e.prev,r=e.next.next;!fr(i,r)&&Lh(i,e,e.next,r)&&Kr(i,r)&&Kr(r,i)&&(t.push(i.i,e.i,r.i),Jr(e),Jr(e.next),e=n=r),e=e.next}while(e!==n);return Ii(e)}function Qd(n,t,e,i,r,o){let s=n;do{let a=s.next.next;for(;a!==s.prev;){if(s.i!==a.i&&cf(s,a)){let l=Dh(s,a);s=Ii(s,s.next),l=Ii(l,l.next),qr(s,t,e,i,r,o,0),qr(l,t,e,i,r,o,0);return}a=a.next}s=s.next}while(s!==n)}function tf(n,t,e,i){const r=[];for(let o=0,s=t.length;o<s;o++){const a=t[o]*i,l=o<s-1?t[o+1]*i:n.length,c=Ch(n,a,l,i,!1);c===c.next&&(c.steiner=!0),r.push(lf(c))}r.sort(ef);for(let o=0;o<r.length;o++)e=nf(r[o],e);return e}function ef(n,t){let e=n.x-t.x;if(e===0&&(e=n.y-t.y,e===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),r=(t.next.y-t.y)/(t.next.x-t.x);e=i-r}return e}function nf(n,t){const e=rf(n,t);if(!e)return t;const i=Dh(e,n);return Ii(i,i.next),Ii(e,e.next)}function rf(n,t){let e=t;const i=n.x,r=n.y;let o=-1/0,s;if(fr(n,e))return e;do{if(fr(n,e.next))return e.next;if(r<=e.y&&r>=e.next.y&&e.next.y!==e.y){const h=e.x+(r-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(h<=i&&h>o&&(o=h,s=e.x<e.next.x?e:e.next,h===i))return s}e=e.next}while(e!==t);if(!s)return null;const a=s,l=s.x,c=s.y;let d=1/0;e=s;do{if(i>=e.x&&e.x>=l&&i!==e.x&&Ph(r<c?i:o,r,l,c,r<c?o:i,r,e.x,e.y)){const h=Math.abs(r-e.y)/(i-e.x);Kr(e,n)&&(h<d||h===d&&(e.x>s.x||e.x===s.x&&of(s,e)))&&(s=e,d=h)}e=e.next}while(e!==a);return s}function of(n,t){return Te(n.prev,n,t.prev)<0&&Te(t.next,n,n.next)<0}function sf(n,t,e,i){let r=n;do r.z===0&&(r.z=Ha(r.x,r.y,t,e,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,af(r)}function af(n){let t,e=1;do{let i=n,r;n=null;let o=null;for(t=0;i;){t++;let s=i,a=0;for(let c=0;c<e&&(a++,s=s.nextZ,!!s);c++);let l=e;for(;a>0||l>0&&s;)a!==0&&(l===0||!s||i.z<=s.z)?(r=i,i=i.nextZ,a--):(r=s,s=s.nextZ,l--),o?o.nextZ=r:n=r,r.prevZ=o,o=r;i=s}o.nextZ=null,e*=2}while(t>1);return n}function Ha(n,t,e,i,r){return n=(n-e)*r|0,t=(t-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function lf(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function Ph(n,t,e,i,r,o,s,a){return(r-s)*(t-a)>=(n-s)*(o-a)&&(n-s)*(i-a)>=(e-s)*(t-a)&&(e-s)*(o-a)>=(r-s)*(i-a)}function Lr(n,t,e,i,r,o,s,a){return!(n===s&&t===a)&&Ph(n,t,e,i,r,o,s,a)}function cf(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!hf(n,t)&&(Kr(n,t)&&Kr(t,n)&&uf(n,t)&&(Te(n.prev,n,t.prev)||Te(n,t.prev,t))||fr(n,t)&&Te(n.prev,n,n.next)>0&&Te(t.prev,t,t.next)>0)}function Te(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function fr(n,t){return n.x===t.x&&n.y===t.y}function Lh(n,t,e,i){const r=Lo(Te(n,t,e)),o=Lo(Te(n,t,i)),s=Lo(Te(e,i,n)),a=Lo(Te(e,i,t));return!!(r!==o&&s!==a||r===0&&Po(n,e,t)||o===0&&Po(n,i,t)||s===0&&Po(e,n,i)||a===0&&Po(e,t,i))}function Po(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function Lo(n){return n>0?1:n<0?-1:0}function hf(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&Lh(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function Kr(n,t){return Te(n.prev,n,n.next)<0?Te(n,t,n.next)>=0&&Te(n,n.prev,t)>=0:Te(n,t,n.prev)<0||Te(n,n.next,t)<0}function uf(n,t){let e=n,i=!1;const r=(n.x+t.x)/2,o=(n.y+t.y)/2;do e.y>o!=e.next.y>o&&e.next.y!==e.y&&r<(e.next.x-e.x)*(o-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function Dh(n,t){const e=Va(n.i,n.x,n.y),i=Va(t.i,t.x,t.y),r=n.next,o=t.prev;return n.next=t,t.prev=n,e.next=r,r.prev=e,i.next=e,e.prev=i,o.next=i,i.prev=o,i}function Gl(n,t,e,i){const r=Va(n,t,e);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function Jr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Va(n,t,e){return{i:n,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function df(n,t,e,i){let r=0;for(let o=t,s=e-i;o<e;o+=i)r+=(n[s]-n[o])*(n[o+1]+n[s+1]),s=o;return r}class ff{static triangulate(t,e,i=2){return Kd(t,e,i)}}class Or{static area(t){const e=t.length;let i=0;for(let r=e-1,o=0;o<e;r=o++)i+=t[r].x*t[o].y-t[o].x*t[r].y;return i*.5}static isClockWise(t){return Or.area(t)<0}static triangulateShape(t,e){const i=[],r=[],o=[];Wl(t),Xl(i,t);let s=t.length;e.forEach(Wl);for(let l=0;l<e.length;l++)r.push(s),s+=e[l].length,Xl(i,e[l]);const a=ff.triangulate(i,r);for(let l=0;l<a.length;l+=3)o.push(a.slice(l,l+3));return o}}function Wl(n){const t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function Xl(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}class Wn extends Se{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};const o=t/2,s=e/2,a=Math.floor(i),l=Math.floor(r),c=a+1,d=l+1,h=t/a,f=e/l,m=[],x=[],v=[],g=[];for(let p=0;p<d;p++){const A=p*f-s;for(let T=0;T<c;T++){const y=T*h-o;x.push(y,-A,0),v.push(0,0,1),g.push(T/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let A=0;A<a;A++){const T=A+c*p,y=A+c*(p+1),L=A+1+c*(p+1),b=A+1+c*p;m.push(T,y,b),m.push(y,L,b)}this.setIndex(m),this.setAttribute("position",new xe(x,3)),this.setAttribute("normal",new xe(v,3)),this.setAttribute("uv",new xe(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wn(t.width,t.height,t.widthSegments,t.heightSegments)}}class Br extends Se{constructor(t=new Rh([new vt(0,.5),new vt(-.5,-.5),new vt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const i=[],r=[],o=[],s=[];let a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let d=0;d<t.length;d++)c(t[d]),this.addGroup(a,l,d),a+=l,l=0;this.setIndex(i),this.setAttribute("position",new xe(r,3)),this.setAttribute("normal",new xe(o,3)),this.setAttribute("uv",new xe(s,2));function c(d){const h=r.length/3,f=d.extractPoints(e);let m=f.shape;const x=f.holes;Or.isClockWise(m)===!1&&(m=m.reverse());for(let g=0,p=x.length;g<p;g++){const A=x[g];Or.isClockWise(A)===!0&&(x[g]=A.reverse())}const v=Or.triangulateShape(m,x);for(let g=0,p=x.length;g<p;g++){const A=x[g];m=m.concat(A)}for(let g=0,p=m.length;g<p;g++){const A=m[g];r.push(A.x,A.y,0),o.push(0,0,1),s.push(A.x,A.y)}for(let g=0,p=v.length;g<p;g++){const A=v[g],T=A[0]+h,y=A[1]+h,L=A[2]+h;i.push(T,y,L),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return pf(e,t)}static fromJSON(t,e){const i=[];for(let r=0,o=t.shapes.length;r<o;r++){const s=e[t.shapes[r]];i.push(s)}return new Br(i,t.curveSegments)}}function pf(n,t){if(t.shapes=[],Array.isArray(n))for(let e=0,i=n.length;e<i;e++){const r=n[e];t.shapes.push(r.uuid)}else t.shapes.push(n.uuid);return t}class Bt extends Se{constructor(t=1,e=32,i=16,r=0,o=Math.PI*2,s=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:r,phiLength:o,thetaStart:s,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(s+a,Math.PI);let c=0;const d=[],h=new E,f=new E,m=[],x=[],v=[],g=[];for(let p=0;p<=i;p++){const A=[],T=p/i;let y=0;p===0&&s===0?y=.5/e:p===i&&l===Math.PI&&(y=-.5/e);for(let L=0;L<=e;L++){const b=L/e;h.x=-t*Math.cos(r+b*o)*Math.sin(s+T*a),h.y=t*Math.cos(s+T*a),h.z=t*Math.sin(r+b*o)*Math.sin(s+T*a),x.push(h.x,h.y,h.z),f.copy(h).normalize(),v.push(f.x,f.y,f.z),g.push(b+y,1-T),A.push(c++)}d.push(A)}for(let p=0;p<i;p++)for(let A=0;A<e;A++){const T=d[p][A+1],y=d[p][A],L=d[p+1][A],b=d[p+1][A+1];(p!==0||s>0)&&m.push(T,y,b),(p!==i-1||l<Math.PI)&&m.push(y,L,b)}this.setIndex(m),this.setAttribute("position",new xe(x,3)),this.setAttribute("normal",new xe(v,3)),this.setAttribute("uv",new xe(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Bt(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class rs extends Se{constructor(t=1,e=.4,i=12,r=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:r,arc:o},i=Math.floor(i),r=Math.floor(r);const s=[],a=[],l=[],c=[],d=new E,h=new E,f=new E;for(let m=0;m<=i;m++)for(let x=0;x<=r;x++){const v=x/r*o,g=m/i*Math.PI*2;h.x=(t+e*Math.cos(g))*Math.cos(v),h.y=(t+e*Math.cos(g))*Math.sin(v),h.z=e*Math.sin(g),a.push(h.x,h.y,h.z),d.x=t*Math.cos(v),d.y=t*Math.sin(v),f.subVectors(h,d).normalize(),l.push(f.x,f.y,f.z),c.push(x/r),c.push(m/i)}for(let m=1;m<=i;m++)for(let x=1;x<=r;x++){const v=(r+1)*m+x-1,g=(r+1)*(m-1)+x-1,p=(r+1)*(m-1)+x,A=(r+1)*m+x;s.push(v,g,A),s.push(g,p,A)}this.setIndex(s),this.setAttribute("position",new xe(a,3)),this.setAttribute("normal",new xe(l,3)),this.setAttribute("uv",new xe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new rs(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class vn extends Ui{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ne(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ah,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Re,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class mf extends Ui{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Du,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class gf extends Ui{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Ih extends Ie{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ne(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class _f extends Ih{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ie.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ne(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Os=new Me,Zl=new E,Yl=new E;class xf{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new vt(512,512),this.mapType=Dn,this.map=null,this.mapPass=null,this.matrix=new Me,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ol,this._frameExtents=new vt(1,1),this._viewportCount=1,this._viewports=[new Ee(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Zl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Zl),Yl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Yl),e.updateMatrixWorld(),Os.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Os,e.coordinateSystem,e.reversedDepth),e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Os)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Uh extends _h{constructor(t=-1,e=1,i=1,r=-1,o=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=o,this.far=s,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,o,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let o=i-t,s=i+t,a=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=c*this.view.offsetX,s=o+c*this.view.width,a-=d*this.view.offsetY,l=a-d*this.view.height}this.projectionMatrix.makeOrthographic(o,s,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class vf extends xf{constructor(){super(new Uh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Mf extends Ih{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ie.DEFAULT_UP),this.updateMatrix(),this.target=new Ie,this.shadow=new vf}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class yf extends nn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}function ql(n,t,e,i){const r=Sf(i);switch(e){case ih:return n*t;case oh:return n*t/r.components*r.byteLength;case ja:return n*t/r.components*r.byteLength;case sh:return n*t*2/r.components*r.byteLength;case Qa:return n*t*2/r.components*r.byteLength;case rh:return n*t*3/r.components*r.byteLength;case Sn:return n*t*4/r.components*r.byteLength;case tl:return n*t*4/r.components*r.byteLength;case Bo:case zo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ko:case Ho:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ua:case fa:return Math.max(n,16)*Math.max(t,8)/4;case ha:case da:return Math.max(n,8)*Math.max(t,8)/2;case pa:case ma:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ga:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case _a:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case xa:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case va:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Ma:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case ya:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Sa:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Ta:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Ea:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case ba:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case wa:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Aa:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Ra:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Ca:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Pa:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case La:case Da:case Ia:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Ua:case Na:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Fa:case Oa:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Sf(n){switch(n){case Dn:case Qc:return{byteLength:1,components:1};case Hr:case th:case Qr:return{byteLength:2,components:1};case Ja:case $a:return{byteLength:2,components:4};case Li:case Ka:case Vn:return{byteLength:4,components:1};case eh:case nh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:qa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=qa);function Nh(){let n=null,t=!1,e=null,i=null;function r(o,s){e(o,s),i=n.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){n=o}}}function Tf(n){const t=new WeakMap;function e(a,l){const c=a.array,d=a.usage,h=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,d),a.onUploadCallback();let m;if(c instanceof Float32Array)m=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=n.SHORT;else if(c instanceof Uint32Array)m=n.UNSIGNED_INT;else if(c instanceof Int32Array)m=n.INT;else if(c instanceof Int8Array)m=n.BYTE;else if(c instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const d=l.array,h=l.updateRanges;if(n.bindBuffer(c,a),h.length===0)n.bufferSubData(c,0,d);else{h.sort((m,x)=>m.start-x.start);let f=0;for(let m=1;m<h.length;m++){const x=h[f],v=h[m];v.start<=x.start+x.count+1?x.count=Math.max(x.count,v.start+v.count-x.start):(++f,h[f]=v)}h.length=f+1;for(let m=0,x=h.length;m<x;m++){const v=h[m];n.bufferSubData(c,v.start*d.BYTES_PER_ELEMENT,d,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function o(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function s(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const d=t.get(a);(!d||d.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:o,update:s}}var Ef=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,bf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,wf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Af=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Rf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Cf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Pf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Lf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Df=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,If=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Uf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Nf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ff=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Of=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Bf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,zf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,kf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Hf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Vf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Gf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Wf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Xf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Zf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Yf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,qf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Kf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Jf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$f=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,jf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Qf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,tp="gl_FragColor = linearToOutputTexel( gl_FragColor );",ep=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,np=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ip=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,rp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,op=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ap=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,lp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,up=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,dp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,fp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,pp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,mp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,gp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,_p=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,xp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Mp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Sp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Tp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ep=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,bp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ap=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Pp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Lp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Dp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ip=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Up=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Np=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Fp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Op=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Bp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,kp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Vp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Gp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Zp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Yp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Kp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Jp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$p=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,jp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Qp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,tm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,em=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,nm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,im=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,rm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,om=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,sm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,am=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,lm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,cm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,um=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,dm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,fm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,pm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,mm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,_m=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,xm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,vm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Mm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ym=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Sm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Tm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Em=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Am=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Pm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Lm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Dm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Im=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Um=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Fm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Om=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Bm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,km=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Vm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Wm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Xm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ym=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,qm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Km=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$m=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,jm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,t0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,e0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,n0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ee={alphahash_fragment:Ef,alphahash_pars_fragment:bf,alphamap_fragment:wf,alphamap_pars_fragment:Af,alphatest_fragment:Rf,alphatest_pars_fragment:Cf,aomap_fragment:Pf,aomap_pars_fragment:Lf,batching_pars_vertex:Df,batching_vertex:If,begin_vertex:Uf,beginnormal_vertex:Nf,bsdfs:Ff,iridescence_fragment:Of,bumpmap_pars_fragment:Bf,clipping_planes_fragment:zf,clipping_planes_pars_fragment:kf,clipping_planes_pars_vertex:Hf,clipping_planes_vertex:Vf,color_fragment:Gf,color_pars_fragment:Wf,color_pars_vertex:Xf,color_vertex:Zf,common:Yf,cube_uv_reflection_fragment:qf,defaultnormal_vertex:Kf,displacementmap_pars_vertex:Jf,displacementmap_vertex:$f,emissivemap_fragment:jf,emissivemap_pars_fragment:Qf,colorspace_fragment:tp,colorspace_pars_fragment:ep,envmap_fragment:np,envmap_common_pars_fragment:ip,envmap_pars_fragment:rp,envmap_pars_vertex:op,envmap_physical_pars_fragment:gp,envmap_vertex:sp,fog_vertex:ap,fog_pars_vertex:lp,fog_fragment:cp,fog_pars_fragment:hp,gradientmap_pars_fragment:up,lightmap_pars_fragment:dp,lights_lambert_fragment:fp,lights_lambert_pars_fragment:pp,lights_pars_begin:mp,lights_toon_fragment:_p,lights_toon_pars_fragment:xp,lights_phong_fragment:vp,lights_phong_pars_fragment:Mp,lights_physical_fragment:yp,lights_physical_pars_fragment:Sp,lights_fragment_begin:Tp,lights_fragment_maps:Ep,lights_fragment_end:bp,logdepthbuf_fragment:wp,logdepthbuf_pars_fragment:Ap,logdepthbuf_pars_vertex:Rp,logdepthbuf_vertex:Cp,map_fragment:Pp,map_pars_fragment:Lp,map_particle_fragment:Dp,map_particle_pars_fragment:Ip,metalnessmap_fragment:Up,metalnessmap_pars_fragment:Np,morphinstance_vertex:Fp,morphcolor_vertex:Op,morphnormal_vertex:Bp,morphtarget_pars_vertex:zp,morphtarget_vertex:kp,normal_fragment_begin:Hp,normal_fragment_maps:Vp,normal_pars_fragment:Gp,normal_pars_vertex:Wp,normal_vertex:Xp,normalmap_pars_fragment:Zp,clearcoat_normal_fragment_begin:Yp,clearcoat_normal_fragment_maps:qp,clearcoat_pars_fragment:Kp,iridescence_pars_fragment:Jp,opaque_fragment:$p,packing:jp,premultiplied_alpha_fragment:Qp,project_vertex:tm,dithering_fragment:em,dithering_pars_fragment:nm,roughnessmap_fragment:im,roughnessmap_pars_fragment:rm,shadowmap_pars_fragment:om,shadowmap_pars_vertex:sm,shadowmap_vertex:am,shadowmask_pars_fragment:lm,skinbase_vertex:cm,skinning_pars_vertex:hm,skinning_vertex:um,skinnormal_vertex:dm,specularmap_fragment:fm,specularmap_pars_fragment:pm,tonemapping_fragment:mm,tonemapping_pars_fragment:gm,transmission_fragment:_m,transmission_pars_fragment:xm,uv_pars_fragment:vm,uv_pars_vertex:Mm,uv_vertex:ym,worldpos_vertex:Sm,background_vert:Tm,background_frag:Em,backgroundCube_vert:bm,backgroundCube_frag:wm,cube_vert:Am,cube_frag:Rm,depth_vert:Cm,depth_frag:Pm,distanceRGBA_vert:Lm,distanceRGBA_frag:Dm,equirect_vert:Im,equirect_frag:Um,linedashed_vert:Nm,linedashed_frag:Fm,meshbasic_vert:Om,meshbasic_frag:Bm,meshlambert_vert:zm,meshlambert_frag:km,meshmatcap_vert:Hm,meshmatcap_frag:Vm,meshnormal_vert:Gm,meshnormal_frag:Wm,meshphong_vert:Xm,meshphong_frag:Zm,meshphysical_vert:Ym,meshphysical_frag:qm,meshtoon_vert:Km,meshtoon_frag:Jm,points_vert:$m,points_frag:jm,shadow_vert:Qm,shadow_frag:t0,sprite_vert:e0,sprite_frag:n0},mt={common:{diffuse:{value:new ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qt}},envmap:{envMap:{value:null},envMapRotation:{value:new Qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qt},normalScale:{value:new vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0},uvTransform:{value:new Qt}},sprite:{diffuse:{value:new ne(16777215)},opacity:{value:1},center:{value:new vt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}}},wn={basic:{uniforms:Xe([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.fog]),vertexShader:ee.meshbasic_vert,fragmentShader:ee.meshbasic_frag},lambert:{uniforms:Xe([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new ne(0)}}]),vertexShader:ee.meshlambert_vert,fragmentShader:ee.meshlambert_frag},phong:{uniforms:Xe([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new ne(0)},specular:{value:new ne(1118481)},shininess:{value:30}}]),vertexShader:ee.meshphong_vert,fragmentShader:ee.meshphong_frag},standard:{uniforms:Xe([mt.common,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.roughnessmap,mt.metalnessmap,mt.fog,mt.lights,{emissive:{value:new ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag},toon:{uniforms:Xe([mt.common,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.gradientmap,mt.fog,mt.lights,{emissive:{value:new ne(0)}}]),vertexShader:ee.meshtoon_vert,fragmentShader:ee.meshtoon_frag},matcap:{uniforms:Xe([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,{matcap:{value:null}}]),vertexShader:ee.meshmatcap_vert,fragmentShader:ee.meshmatcap_frag},points:{uniforms:Xe([mt.points,mt.fog]),vertexShader:ee.points_vert,fragmentShader:ee.points_frag},dashed:{uniforms:Xe([mt.common,mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ee.linedashed_vert,fragmentShader:ee.linedashed_frag},depth:{uniforms:Xe([mt.common,mt.displacementmap]),vertexShader:ee.depth_vert,fragmentShader:ee.depth_frag},normal:{uniforms:Xe([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,{opacity:{value:1}}]),vertexShader:ee.meshnormal_vert,fragmentShader:ee.meshnormal_frag},sprite:{uniforms:Xe([mt.sprite,mt.fog]),vertexShader:ee.sprite_vert,fragmentShader:ee.sprite_frag},background:{uniforms:{uvTransform:{value:new Qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ee.background_vert,fragmentShader:ee.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qt}},vertexShader:ee.backgroundCube_vert,fragmentShader:ee.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ee.cube_vert,fragmentShader:ee.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ee.equirect_vert,fragmentShader:ee.equirect_frag},distanceRGBA:{uniforms:Xe([mt.common,mt.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ee.distanceRGBA_vert,fragmentShader:ee.distanceRGBA_frag},shadow:{uniforms:Xe([mt.lights,mt.fog,{color:{value:new ne(0)},opacity:{value:1}}]),vertexShader:ee.shadow_vert,fragmentShader:ee.shadow_frag}};wn.physical={uniforms:Xe([wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qt},clearcoatNormalScale:{value:new vt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qt},sheen:{value:0},sheenColor:{value:new ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qt},transmissionSamplerSize:{value:new vt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qt},attenuationDistance:{value:0},attenuationColor:{value:new ne(0)},specularColor:{value:new ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qt},anisotropyVector:{value:new vt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qt}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag};const Do={r:0,b:0,g:0},Mi=new Re,i0=new Me;function r0(n,t,e,i,r,o,s){const a=new ne(0);let l=o===!0?0:1,c,d,h=null,f=0,m=null;function x(T){let y=T.isScene===!0?T.background:null;return y&&y.isTexture&&(y=(T.backgroundBlurriness>0?e:t).get(y)),y}function v(T){let y=!1;const L=x(T);L===null?p(a,l):L&&L.isColor&&(p(L,1),y=!0);const b=n.xr.getEnvironmentBlendMode();b==="additive"?i.buffers.color.setClear(0,0,0,1,s):b==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,s),(n.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function g(T,y){const L=x(y);L&&(L.isCubeTexture||L.mapping===ns)?(d===void 0&&(d=new Ae(new Pe(1,1,1),new ui({name:"BackgroundCubeMaterial",uniforms:dr(wn.backgroundCube.uniforms),vertexShader:wn.backgroundCube.vertexShader,fragmentShader:wn.backgroundCube.fragmentShader,side:Qe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(b,C,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),Mi.copy(y.backgroundRotation),Mi.x*=-1,Mi.y*=-1,Mi.z*=-1,L.isCubeTexture&&L.isRenderTargetTexture===!1&&(Mi.y*=-1,Mi.z*=-1),d.material.uniforms.envMap.value=L,d.material.uniforms.flipEnvMap.value=L.isCubeTexture&&L.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(i0.makeRotationFromEuler(Mi)),d.material.toneMapped=he.getTransfer(L.colorSpace)!==me,(h!==L||f!==L.version||m!==n.toneMapping)&&(d.material.needsUpdate=!0,h=L,f=L.version,m=n.toneMapping),d.layers.enableAll(),T.unshift(d,d.geometry,d.material,0,0,null)):L&&L.isTexture&&(c===void 0&&(c=new Ae(new Wn(2,2),new ui({name:"BackgroundMaterial",uniforms:dr(wn.background.uniforms),vertexShader:wn.background.vertexShader,fragmentShader:wn.background.fragmentShader,side:hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=L,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=he.getTransfer(L.colorSpace)!==me,L.matrixAutoUpdate===!0&&L.updateMatrix(),c.material.uniforms.uvTransform.value.copy(L.matrix),(h!==L||f!==L.version||m!==n.toneMapping)&&(c.material.needsUpdate=!0,h=L,f=L.version,m=n.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function p(T,y){T.getRGB(Do,gh(n)),i.buffers.color.setClear(Do.r,Do.g,Do.b,y,s)}function A(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(T,y=1){a.set(T),l=y,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(T){l=T,p(a,l)},render:v,addToRenderList:g,dispose:A}}function o0(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null);let o=r,s=!1;function a(_,u,N,O,k){let H=!1;const G=h(O,N,u);o!==G&&(o=G,c(o.object)),H=m(_,O,N,k),H&&x(_,O,N,k),k!==null&&t.update(k,n.ELEMENT_ARRAY_BUFFER),(H||s)&&(s=!1,y(_,u,N,O),k!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function l(){return n.createVertexArray()}function c(_){return n.bindVertexArray(_)}function d(_){return n.deleteVertexArray(_)}function h(_,u,N){const O=N.wireframe===!0;let k=i[_.id];k===void 0&&(k={},i[_.id]=k);let H=k[u.id];H===void 0&&(H={},k[u.id]=H);let G=H[O];return G===void 0&&(G=f(l()),H[O]=G),G}function f(_){const u=[],N=[],O=[];for(let k=0;k<e;k++)u[k]=0,N[k]=0,O[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:u,enabledAttributes:N,attributeDivisors:O,object:_,attributes:{},index:null}}function m(_,u,N,O){const k=o.attributes,H=u.attributes;let G=0;const Z=N.getAttributes();for(const V in Z)if(Z[V].location>=0){const rt=k[V];let ht=H[V];if(ht===void 0&&(V==="instanceMatrix"&&_.instanceMatrix&&(ht=_.instanceMatrix),V==="instanceColor"&&_.instanceColor&&(ht=_.instanceColor)),rt===void 0||rt.attribute!==ht||ht&&rt.data!==ht.data)return!0;G++}return o.attributesNum!==G||o.index!==O}function x(_,u,N,O){const k={},H=u.attributes;let G=0;const Z=N.getAttributes();for(const V in Z)if(Z[V].location>=0){let rt=H[V];rt===void 0&&(V==="instanceMatrix"&&_.instanceMatrix&&(rt=_.instanceMatrix),V==="instanceColor"&&_.instanceColor&&(rt=_.instanceColor));const ht={};ht.attribute=rt,rt&&rt.data&&(ht.data=rt.data),k[V]=ht,G++}o.attributes=k,o.attributesNum=G,o.index=O}function v(){const _=o.newAttributes;for(let u=0,N=_.length;u<N;u++)_[u]=0}function g(_){p(_,0)}function p(_,u){const N=o.newAttributes,O=o.enabledAttributes,k=o.attributeDivisors;N[_]=1,O[_]===0&&(n.enableVertexAttribArray(_),O[_]=1),k[_]!==u&&(n.vertexAttribDivisor(_,u),k[_]=u)}function A(){const _=o.newAttributes,u=o.enabledAttributes;for(let N=0,O=u.length;N<O;N++)u[N]!==_[N]&&(n.disableVertexAttribArray(N),u[N]=0)}function T(_,u,N,O,k,H,G){G===!0?n.vertexAttribIPointer(_,u,N,k,H):n.vertexAttribPointer(_,u,N,O,k,H)}function y(_,u,N,O){v();const k=O.attributes,H=N.getAttributes(),G=u.defaultAttributeValues;for(const Z in H){const V=H[Z];if(V.location>=0){let et=k[Z];if(et===void 0&&(Z==="instanceMatrix"&&_.instanceMatrix&&(et=_.instanceMatrix),Z==="instanceColor"&&_.instanceColor&&(et=_.instanceColor)),et!==void 0){const rt=et.normalized,ht=et.itemSize,Rt=t.get(et);if(Rt===void 0)continue;const Gt=Rt.buffer,Yt=Rt.type,Dt=Rt.bytesPerElement,$=Yt===n.INT||Yt===n.UNSIGNED_INT||et.gpuType===Ka;if(et.isInterleavedBufferAttribute){const nt=et.data,ut=nt.stride,Tt=et.offset;if(nt.isInstancedInterleavedBuffer){for(let _t=0;_t<V.locationSize;_t++)p(V.location+_t,nt.meshPerAttribute);_.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let _t=0;_t<V.locationSize;_t++)g(V.location+_t);n.bindBuffer(n.ARRAY_BUFFER,Gt);for(let _t=0;_t<V.locationSize;_t++)T(V.location+_t,ht/V.locationSize,Yt,rt,ut*Dt,(Tt+ht/V.locationSize*_t)*Dt,$)}else{if(et.isInstancedBufferAttribute){for(let nt=0;nt<V.locationSize;nt++)p(V.location+nt,et.meshPerAttribute);_.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let nt=0;nt<V.locationSize;nt++)g(V.location+nt);n.bindBuffer(n.ARRAY_BUFFER,Gt);for(let nt=0;nt<V.locationSize;nt++)T(V.location+nt,ht/V.locationSize,Yt,rt,ht*Dt,ht/V.locationSize*nt*Dt,$)}}else if(G!==void 0){const rt=G[Z];if(rt!==void 0)switch(rt.length){case 2:n.vertexAttrib2fv(V.location,rt);break;case 3:n.vertexAttrib3fv(V.location,rt);break;case 4:n.vertexAttrib4fv(V.location,rt);break;default:n.vertexAttrib1fv(V.location,rt)}}}}A()}function L(){U();for(const _ in i){const u=i[_];for(const N in u){const O=u[N];for(const k in O)d(O[k].object),delete O[k];delete u[N]}delete i[_]}}function b(_){if(i[_.id]===void 0)return;const u=i[_.id];for(const N in u){const O=u[N];for(const k in O)d(O[k].object),delete O[k];delete u[N]}delete i[_.id]}function C(_){for(const u in i){const N=i[u];if(N[_.id]===void 0)continue;const O=N[_.id];for(const k in O)d(O[k].object),delete O[k];delete N[_.id]}}function U(){M(),s=!0,o!==r&&(o=r,c(o.object))}function M(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:U,resetDefaultState:M,dispose:L,releaseStatesOfGeometry:b,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:g,disableUnusedAttributes:A}}function s0(n,t,e){let i;function r(c){i=c}function o(c,d){n.drawArrays(i,c,d),e.update(d,i,1)}function s(c,d,h){h!==0&&(n.drawArraysInstanced(i,c,d,h),e.update(d,i,h))}function a(c,d,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,d,0,h);let m=0;for(let x=0;x<h;x++)m+=d[x];e.update(m,i,1)}function l(c,d,h,f){if(h===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let x=0;x<c.length;x++)s(c[x],d[x],f[x]);else{m.multiDrawArraysInstancedWEBGL(i,c,0,d,0,f,0,h);let x=0;for(let v=0;v<h;v++)x+=d[v]*f[v];e.update(x,i,1)}}this.setMode=r,this.render=o,this.renderInstances=s,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function a0(n,t,e,i){let r;function o(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function s(C){return!(C!==Sn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const U=C===Qr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Dn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Vn&&!U)}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const h=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),A=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),L=x>0,b=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:m,maxVertexTextures:x,maxTextureSize:v,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:A,maxVaryings:T,maxFragmentUniforms:y,vertexTextures:L,maxSamples:b}}function l0(n){const t=this;let e=null,i=0,r=!1,o=!1;const s=new Si,a=new Qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const m=h.length!==0||f||i!==0||r;return r=f,i=h.length,m},this.beginShadows=function(){o=!0,d(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(h,f){e=d(h,f,0)},this.setState=function(h,f,m){const x=h.clippingPlanes,v=h.clipIntersection,g=h.clipShadows,p=n.get(h);if(!r||x===null||x.length===0||o&&!g)o?d(null):c();else{const A=o?0:i,T=A*4;let y=p.clippingState||null;l.value=y,y=d(x,f,T,m);for(let L=0;L!==T;++L)y[L]=e[L];p.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function d(h,f,m,x){const v=h!==null?h.length:0;let g=null;if(v!==0){if(g=l.value,x!==!0||g===null){const p=m+v*4,A=f.matrixWorldInverse;a.getNormalMatrix(A),(g===null||g.length<p)&&(g=new Float32Array(p));for(let T=0,y=m;T!==v;++T,y+=4)s.copy(h[T]).applyMatrix4(A,a),s.normal.toArray(g,y),g[y+3]=s.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}function c0(n){let t=new WeakMap;function e(s,a){return a===sa?s.mapping=cr:a===aa&&(s.mapping=hr),s}function i(s){if(s&&s.isTexture){const a=s.mapping;if(a===sa||a===aa)if(t.has(s)){const l=t.get(s).texture;return e(l,s.mapping)}else{const l=s.image;if(l&&l.height>0){const c=new Rd(l.height);return c.fromEquirectangularTexture(n,s),t.set(s,c),s.addEventListener("dispose",r),e(c.texture,s.mapping)}else return null}}return s}function r(s){const a=s.target;a.removeEventListener("dispose",r);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function o(){t=new WeakMap}return{get:i,dispose:o}}const nr=4,Kl=[.125,.215,.35,.446,.526,.582],wi=20,Bs=new Uh,Jl=new ne;let zs=null,ks=0,Hs=0,Vs=!1;const Ti=(1+Math.sqrt(5))/2,er=1/Ti,$l=[new E(-Ti,er,0),new E(Ti,er,0),new E(-er,0,Ti),new E(er,0,Ti),new E(0,Ti,-er),new E(0,Ti,er),new E(-1,1,-1),new E(1,1,-1),new E(-1,1,1),new E(1,1,1)],h0=new E;class jl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,r=100,o={}){const{size:s=256,position:a=h0}=o;zs=this._renderer.getRenderTarget(),ks=this._renderer.getActiveCubeFace(),Hs=this._renderer.getActiveMipmapLevel(),Vs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,r,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ec(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=tc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(zs,ks,Hs),this._renderer.xr.enabled=Vs,t.scissorTest=!1,Io(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===cr||t.mapping===hr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),zs=this._renderer.getRenderTarget(),ks=this._renderer.getActiveCubeFace(),Hs=this._renderer.getActiveMipmapLevel(),Vs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Cn,minFilter:Cn,generateMipmaps:!1,type:Qr,format:Sn,colorSpace:ur,depthBuffer:!1},r=Ql(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ql(t,e,i);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=u0(o)),this._blurMaterial=d0(o,t,e)}return r}_compileMaterial(t){const e=new Ae(this._lodPlanes[0],t);this._renderer.compile(e,Bs)}_sceneToCubeUV(t,e,i,r,o){const l=new nn(90,1,e,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,m=h.toneMapping;h.getClearColor(Jl),h.toneMapping=li,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null));const v=new il({name:"PMREM.Background",side:Qe,depthWrite:!1,depthTest:!1}),g=new Ae(new Pe,v);let p=!1;const A=t.background;A?A.isColor&&(v.color.copy(A),t.background=null,p=!0):(v.color.copy(Jl),p=!0);for(let T=0;T<6;T++){const y=T%3;y===0?(l.up.set(0,c[T],0),l.position.set(o.x,o.y,o.z),l.lookAt(o.x+d[T],o.y,o.z)):y===1?(l.up.set(0,0,c[T]),l.position.set(o.x,o.y,o.z),l.lookAt(o.x,o.y+d[T],o.z)):(l.up.set(0,c[T],0),l.position.set(o.x,o.y,o.z),l.lookAt(o.x,o.y,o.z+d[T]));const L=this._cubeSize;Io(r,y*L,T>2?L:0,L,L),h.setRenderTarget(r),p&&h.render(g,l),h.render(t,l)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=m,h.autoClear=f,t.background=A}_textureToCubeUV(t,e){const i=this._renderer,r=t.mapping===cr||t.mapping===hr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ec()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=tc());const o=r?this._cubemapMaterial:this._equirectMaterial,s=new Ae(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=t;const l=this._cubeSize;Io(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(s,Bs)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let o=1;o<r;o++){const s=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),a=$l[(r-o-1)%$l.length];this._blur(t,o-1,o,s,a)}e.autoClear=i}_blur(t,e,i,r,o){const s=this._pingPongRenderTarget;this._halfBlur(t,s,e,i,r,"latitudinal",o),this._halfBlur(s,t,i,i,r,"longitudinal",o)}_halfBlur(t,e,i,r,o,s,a){const l=this._renderer,c=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,h=new Ae(this._lodPlanes[r],c),f=c.uniforms,m=this._sizeLods[i]-1,x=isFinite(o)?Math.PI/(2*m):2*Math.PI/(2*wi-1),v=o/x,g=isFinite(o)?1+Math.floor(d*v):wi;g>wi&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${wi}`);const p=[];let A=0;for(let C=0;C<wi;++C){const U=C/v,M=Math.exp(-U*U/2);p.push(M),C===0?A+=M:C<g&&(A+=2*M)}for(let C=0;C<p.length;C++)p[C]=p[C]/A;f.envMap.value=t.texture,f.samples.value=g,f.weights.value=p,f.latitudinal.value=s==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:T}=this;f.dTheta.value=x,f.mipInt.value=T-i;const y=this._sizeLods[r],L=3*y*(r>T-nr?r-T+nr:0),b=4*(this._cubeSize-y);Io(e,L,b,3*y,2*y),l.setRenderTarget(e),l.render(h,Bs)}}function u0(n){const t=[],e=[],i=[];let r=n;const o=n-nr+1+Kl.length;for(let s=0;s<o;s++){const a=Math.pow(2,r);e.push(a);let l=1/a;s>n-nr?l=Kl[s-n+nr-1]:s===0&&(l=0),i.push(l);const c=1/(a-2),d=-c,h=1+c,f=[d,d,h,d,h,h,d,d,h,h,d,h],m=6,x=6,v=3,g=2,p=1,A=new Float32Array(v*x*m),T=new Float32Array(g*x*m),y=new Float32Array(p*x*m);for(let b=0;b<m;b++){const C=b%3*2/3-1,U=b>2?0:-1,M=[C,U,0,C+2/3,U,0,C+2/3,U+1,0,C,U,0,C+2/3,U+1,0,C,U+1,0];A.set(M,v*x*b),T.set(f,g*x*b);const _=[b,b,b,b,b,b];y.set(_,p*x*b)}const L=new Se;L.setAttribute("position",new En(A,v)),L.setAttribute("uv",new En(T,g)),L.setAttribute("faceIndex",new En(y,p)),t.push(L),r>nr&&r--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Ql(n,t,e){const i=new Di(n,t,e);return i.texture.mapping=ns,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Io(n,t,e,i,r){n.viewport.set(t,e,i,r),n.scissor.set(t,e,i,r)}function d0(n,t,e){const i=new Float32Array(wi),r=new E(0,1,0);return new ui({name:"SphericalGaussianBlur",defines:{n:wi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ll(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function tc(){return new ui({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ll(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function ec(){return new ui({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ll(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function ll(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function f0(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===sa||l===aa,d=l===cr||l===hr;if(c||d){let h=t.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new jl(n)),h=c?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{const m=a.image;return c&&m&&m.height>0||d&&m&&r(m)?(e===null&&(e=new jl(n)),h=c?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",o),h.texture):null}}}return a}function r(a){let l=0;const c=6;for(let d=0;d<c;d++)a[d]!==void 0&&l++;return l===c}function o(a){const l=a.target;l.removeEventListener("dispose",o);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function s(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:s}}function p0(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const r=e(i);return r===null&&Zr("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function m0(n,t,e,i){const r={},o=new WeakMap;function s(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const x in f.attributes)t.remove(f.attributes[x]);f.removeEventListener("dispose",s),delete r[f.id];const m=o.get(f);m&&(t.remove(m),o.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(h,f){return r[f.id]===!0||(f.addEventListener("dispose",s),r[f.id]=!0,e.memory.geometries++),f}function l(h){const f=h.attributes;for(const m in f)t.update(f[m],n.ARRAY_BUFFER)}function c(h){const f=[],m=h.index,x=h.attributes.position;let v=0;if(m!==null){const A=m.array;v=m.version;for(let T=0,y=A.length;T<y;T+=3){const L=A[T+0],b=A[T+1],C=A[T+2];f.push(L,b,b,C,C,L)}}else if(x!==void 0){const A=x.array;v=x.version;for(let T=0,y=A.length/3-1;T<y;T+=3){const L=T+0,b=T+1,C=T+2;f.push(L,b,b,C,C,L)}}else return;const g=new(ch(f)?mh:ph)(f,1);g.version=v;const p=o.get(h);p&&t.remove(p),o.set(h,g)}function d(h){const f=o.get(h);if(f){const m=h.index;m!==null&&f.version<m.version&&c(h)}else c(h);return o.get(h)}return{get:a,update:l,getWireframeAttribute:d}}function g0(n,t,e){let i;function r(f){i=f}let o,s;function a(f){o=f.type,s=f.bytesPerElement}function l(f,m){n.drawElements(i,m,o,f*s),e.update(m,i,1)}function c(f,m,x){x!==0&&(n.drawElementsInstanced(i,m,o,f*s,x),e.update(m,i,x))}function d(f,m,x){if(x===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,o,f,0,x);let g=0;for(let p=0;p<x;p++)g+=m[p];e.update(g,i,1)}function h(f,m,x,v){if(x===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<f.length;p++)c(f[p]/s,m[p],v[p]);else{g.multiDrawElementsInstancedWEBGL(i,m,0,o,f,0,v,0,x);let p=0;for(let A=0;A<x;A++)p+=m[A]*v[A];e.update(p,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function _0(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(o,s,a){switch(e.calls++,s){case n.TRIANGLES:e.triangles+=a*(o/3);break;case n.LINES:e.lines+=a*(o/2);break;case n.LINE_STRIP:e.lines+=a*(o-1);break;case n.LINE_LOOP:e.lines+=a*o;break;case n.POINTS:e.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function x0(n,t,e){const i=new WeakMap,r=new Ee;function o(s,a,l){const c=s.morphTargetInfluences,d=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=d!==void 0?d.length:0;let f=i.get(a);if(f===void 0||f.count!==h){let _=function(){U.dispose(),i.delete(a),a.removeEventListener("dispose",_)};var m=_;f!==void 0&&f.texture.dispose();const x=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],A=a.morphAttributes.normal||[],T=a.morphAttributes.color||[];let y=0;x===!0&&(y=1),v===!0&&(y=2),g===!0&&(y=3);let L=a.attributes.position.count*y,b=1;L>t.maxTextureSize&&(b=Math.ceil(L/t.maxTextureSize),L=t.maxTextureSize);const C=new Float32Array(L*b*4*h),U=new hh(C,L,b,h);U.type=Vn,U.needsUpdate=!0;const M=y*4;for(let u=0;u<h;u++){const N=p[u],O=A[u],k=T[u],H=L*b*4*u;for(let G=0;G<N.count;G++){const Z=G*M;x===!0&&(r.fromBufferAttribute(N,G),C[H+Z+0]=r.x,C[H+Z+1]=r.y,C[H+Z+2]=r.z,C[H+Z+3]=0),v===!0&&(r.fromBufferAttribute(O,G),C[H+Z+4]=r.x,C[H+Z+5]=r.y,C[H+Z+6]=r.z,C[H+Z+7]=0),g===!0&&(r.fromBufferAttribute(k,G),C[H+Z+8]=r.x,C[H+Z+9]=r.y,C[H+Z+10]=r.z,C[H+Z+11]=k.itemSize===4?r.w:1)}}f={count:h,texture:U,size:new vt(L,b)},i.set(a,f),a.addEventListener("dispose",_)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",s.morphTexture,e);else{let x=0;for(let g=0;g<c.length;g++)x+=c[g];const v=a.morphTargetsRelative?1:1-x;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:o}}function v0(n,t,e,i){let r=new WeakMap;function o(l){const c=i.render.frame,d=l.geometry,h=t.get(l,d);if(r.get(h)!==c&&(t.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return h}function s(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:o,dispose:s}}const Fh=new Ye,nc=new Sh(1,1),Oh=new hh,Bh=new ud,zh=new xh,ic=[],rc=[],oc=new Float32Array(16),sc=new Float32Array(9),ac=new Float32Array(4);function gr(n,t,e){const i=n[0];if(i<=0||i>0)return n;const r=t*e;let o=ic[r];if(o===void 0&&(o=new Float32Array(r),ic[r]=o),t!==0){i.toArray(o,0);for(let s=1,a=0;s!==t;++s)a+=e,n[s].toArray(o,a)}return o}function Ue(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ne(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function os(n,t){let e=rc[t];e===void 0&&(e=new Int32Array(t),rc[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function M0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function y0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;n.uniform2fv(this.addr,t),Ne(e,t)}}function S0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ue(e,t))return;n.uniform3fv(this.addr,t),Ne(e,t)}}function T0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;n.uniform4fv(this.addr,t),Ne(e,t)}}function E0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ue(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ne(e,t)}else{if(Ue(e,i))return;ac.set(i),n.uniformMatrix2fv(this.addr,!1,ac),Ne(e,i)}}function b0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ue(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ne(e,t)}else{if(Ue(e,i))return;sc.set(i),n.uniformMatrix3fv(this.addr,!1,sc),Ne(e,i)}}function w0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ue(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ne(e,t)}else{if(Ue(e,i))return;oc.set(i),n.uniformMatrix4fv(this.addr,!1,oc),Ne(e,i)}}function A0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function R0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;n.uniform2iv(this.addr,t),Ne(e,t)}}function C0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ue(e,t))return;n.uniform3iv(this.addr,t),Ne(e,t)}}function P0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;n.uniform4iv(this.addr,t),Ne(e,t)}}function L0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function D0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;n.uniform2uiv(this.addr,t),Ne(e,t)}}function I0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ue(e,t))return;n.uniform3uiv(this.addr,t),Ne(e,t)}}function U0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;n.uniform4uiv(this.addr,t),Ne(e,t)}}function N0(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let o;this.type===n.SAMPLER_2D_SHADOW?(nc.compareFunction=lh,o=nc):o=Fh,e.setTexture2D(t||o,r)}function F0(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||Bh,r)}function O0(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTextureCube(t||zh,r)}function B0(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||Oh,r)}function z0(n){switch(n){case 5126:return M0;case 35664:return y0;case 35665:return S0;case 35666:return T0;case 35674:return E0;case 35675:return b0;case 35676:return w0;case 5124:case 35670:return A0;case 35667:case 35671:return R0;case 35668:case 35672:return C0;case 35669:case 35673:return P0;case 5125:return L0;case 36294:return D0;case 36295:return I0;case 36296:return U0;case 35678:case 36198:case 36298:case 36306:case 35682:return N0;case 35679:case 36299:case 36307:return F0;case 35680:case 36300:case 36308:case 36293:return O0;case 36289:case 36303:case 36311:case 36292:return B0}}function k0(n,t){n.uniform1fv(this.addr,t)}function H0(n,t){const e=gr(t,this.size,2);n.uniform2fv(this.addr,e)}function V0(n,t){const e=gr(t,this.size,3);n.uniform3fv(this.addr,e)}function G0(n,t){const e=gr(t,this.size,4);n.uniform4fv(this.addr,e)}function W0(n,t){const e=gr(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function X0(n,t){const e=gr(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Z0(n,t){const e=gr(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Y0(n,t){n.uniform1iv(this.addr,t)}function q0(n,t){n.uniform2iv(this.addr,t)}function K0(n,t){n.uniform3iv(this.addr,t)}function J0(n,t){n.uniform4iv(this.addr,t)}function $0(n,t){n.uniform1uiv(this.addr,t)}function j0(n,t){n.uniform2uiv(this.addr,t)}function Q0(n,t){n.uniform3uiv(this.addr,t)}function tg(n,t){n.uniform4uiv(this.addr,t)}function eg(n,t,e){const i=this.cache,r=t.length,o=os(e,r);Ue(i,o)||(n.uniform1iv(this.addr,o),Ne(i,o));for(let s=0;s!==r;++s)e.setTexture2D(t[s]||Fh,o[s])}function ng(n,t,e){const i=this.cache,r=t.length,o=os(e,r);Ue(i,o)||(n.uniform1iv(this.addr,o),Ne(i,o));for(let s=0;s!==r;++s)e.setTexture3D(t[s]||Bh,o[s])}function ig(n,t,e){const i=this.cache,r=t.length,o=os(e,r);Ue(i,o)||(n.uniform1iv(this.addr,o),Ne(i,o));for(let s=0;s!==r;++s)e.setTextureCube(t[s]||zh,o[s])}function rg(n,t,e){const i=this.cache,r=t.length,o=os(e,r);Ue(i,o)||(n.uniform1iv(this.addr,o),Ne(i,o));for(let s=0;s!==r;++s)e.setTexture2DArray(t[s]||Oh,o[s])}function og(n){switch(n){case 5126:return k0;case 35664:return H0;case 35665:return V0;case 35666:return G0;case 35674:return W0;case 35675:return X0;case 35676:return Z0;case 5124:case 35670:return Y0;case 35667:case 35671:return q0;case 35668:case 35672:return K0;case 35669:case 35673:return J0;case 5125:return $0;case 36294:return j0;case 36295:return Q0;case 36296:return tg;case 35678:case 36198:case 36298:case 36306:case 35682:return eg;case 35679:case 36299:case 36307:return ng;case 35680:case 36300:case 36308:case 36293:return ig;case 36289:case 36303:case 36311:case 36292:return rg}}class sg{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=z0(e.type)}}class ag{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=og(e.type)}}class lg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const r=this.seq;for(let o=0,s=r.length;o!==s;++o){const a=r[o];a.setValue(t,e[a.id],i)}}}const Gs=/(\w+)(\])?(\[|\.)?/g;function lc(n,t){n.seq.push(t),n.map[t.id]=t}function cg(n,t,e){const i=n.name,r=i.length;for(Gs.lastIndex=0;;){const o=Gs.exec(i),s=Gs.lastIndex;let a=o[1];const l=o[2]==="]",c=o[3];if(l&&(a=a|0),c===void 0||c==="["&&s+2===r){lc(e,c===void 0?new sg(a,n,t):new ag(a,n,t));break}else{let h=e.map[a];h===void 0&&(h=new lg(a),lc(e,h)),e=h}}}class Vo{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const o=t.getActiveUniform(e,r),s=t.getUniformLocation(e,o.name);cg(o,s,this)}}setValue(t,e,i,r){const o=this.map[e];o!==void 0&&o.setValue(t,i,r)}setOptional(t,e,i){const r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let o=0,s=e.length;o!==s;++o){const a=e[o],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,r)}}static seqWithValue(t,e){const i=[];for(let r=0,o=t.length;r!==o;++r){const s=t[r];s.id in e&&i.push(s)}return i}}function cc(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const hg=37297;let ug=0;function dg(n,t){const e=n.split(`
`),i=[],r=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let s=r;s<o;s++){const a=s+1;i.push(`${a===t?">":" "} ${a}: ${e[s]}`)}return i.join(`
`)}const hc=new Qt;function fg(n){he._getMatrix(hc,he.workingColorSpace,n);const t=`mat3( ${hc.elements.map(e=>e.toFixed(4))} )`;switch(he.getTransfer(n)){case Xo:return[t,"LinearTransferOETF"];case me:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function uc(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),o=(n.getShaderInfoLog(t)||"").trim();if(i&&o==="")return"";const s=/ERROR: 0:(\d+)/.exec(o);if(s){const a=parseInt(s[1]);return e.toUpperCase()+`

`+o+`

`+dg(n.getShaderSource(t),a)}else return o}function pg(n,t){const e=fg(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function mg(n,t){let e;switch(t){case Eu:e="Linear";break;case bu:e="Reinhard";break;case wu:e="Cineon";break;case Au:e="ACESFilmic";break;case Cu:e="AgX";break;case Pu:e="Neutral";break;case Ru:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Uo=new E;function gg(){he.getLuminanceCoefficients(Uo);const n=Uo.x.toFixed(4),t=Uo.y.toFixed(4),e=Uo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function _g(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Dr).join(`
`)}function xg(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function vg(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const o=n.getActiveAttrib(t,r),s=o.name;let a=1;o.type===n.FLOAT_MAT2&&(a=2),o.type===n.FLOAT_MAT3&&(a=3),o.type===n.FLOAT_MAT4&&(a=4),e[s]={type:o.type,location:n.getAttribLocation(t,s),locationSize:a}}return e}function Dr(n){return n!==""}function dc(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function fc(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Mg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ga(n){return n.replace(Mg,Sg)}const yg=new Map;function Sg(n,t){let e=ee[t];if(e===void 0){const i=yg.get(t);if(i!==void 0)e=ee[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Ga(e)}const Tg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function pc(n){return n.replace(Tg,Eg)}function Eg(n,t,e,i){let r="";for(let o=parseInt(t);o<parseInt(e);o++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return r}function mc(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function bg(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Kc?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Jc?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===kn&&(t="SHADOWMAP_TYPE_VSM"),t}function wg(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case cr:case hr:t="ENVMAP_TYPE_CUBE";break;case ns:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Ag(n){let t="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===hr&&(t="ENVMAP_MODE_REFRACTION"),t}function Rg(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case $c:t="ENVMAP_BLENDING_MULTIPLY";break;case Su:t="ENVMAP_BLENDING_MIX";break;case Tu:t="ENVMAP_BLENDING_ADD";break}return t}function Cg(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Pg(n,t,e,i){const r=n.getContext(),o=e.defines;let s=e.vertexShader,a=e.fragmentShader;const l=bg(e),c=wg(e),d=Ag(e),h=Rg(e),f=Cg(e),m=_g(e),x=xg(o),v=r.createProgram();let g,p,A=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Dr).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Dr).join(`
`),p.length>0&&(p+=`
`)):(g=[mc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Dr).join(`
`),p=[mc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+d:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==li?"#define TONE_MAPPING":"",e.toneMapping!==li?ee.tonemapping_pars_fragment:"",e.toneMapping!==li?mg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ee.colorspace_pars_fragment,pg("linearToOutputTexel",e.outputColorSpace),gg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Dr).join(`
`)),s=Ga(s),s=dc(s,e),s=fc(s,e),a=Ga(a),a=dc(a,e),a=fc(a,e),s=pc(s),a=pc(a),e.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===xl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===xl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const T=A+g+s,y=A+p+a,L=cc(r,r.VERTEX_SHADER,T),b=cc(r,r.FRAGMENT_SHADER,y);r.attachShader(v,L),r.attachShader(v,b),e.index0AttributeName!==void 0?r.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function C(u){if(n.debug.checkShaderErrors){const N=r.getProgramInfoLog(v)||"",O=r.getShaderInfoLog(L)||"",k=r.getShaderInfoLog(b)||"",H=N.trim(),G=O.trim(),Z=k.trim();let V=!0,et=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(V=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,v,L,b);else{const rt=uc(r,L,"vertex"),ht=uc(r,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+u.name+`
Material Type: `+u.type+`

Program Info Log: `+H+`
`+rt+`
`+ht)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(G===""||Z==="")&&(et=!1);et&&(u.diagnostics={runnable:V,programLog:H,vertexShader:{log:G,prefix:g},fragmentShader:{log:Z,prefix:p}})}r.deleteShader(L),r.deleteShader(b),U=new Vo(r,v),M=vg(r,v)}let U;this.getUniforms=function(){return U===void 0&&C(this),U};let M;this.getAttributes=function(){return M===void 0&&C(this),M};let _=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=r.getProgramParameter(v,hg)),_},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=ug++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=L,this.fragmentShader=b,this}let Lg=0;class Dg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(e),o=this._getShaderStage(i),s=this._getShaderCacheForMaterial(t);return s.has(r)===!1&&(s.add(r),r.usedTimes++),s.has(o)===!1&&(s.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Ig(t),e.set(t,i)),i}}class Ig{constructor(t){this.id=Lg++,this.code=t,this.usedTimes=0}}function Ug(n,t,e,i,r,o,s){const a=new dh,l=new Dg,c=new Set,d=[],h=r.logarithmicDepthBuffer,f=r.vertexTextures;let m=r.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(M){return c.add(M),M===0?"uv":`uv${M}`}function g(M,_,u,N,O){const k=N.fog,H=O.geometry,G=M.isMeshStandardMaterial?N.environment:null,Z=(M.isMeshStandardMaterial?e:t).get(M.envMap||G),V=Z&&Z.mapping===ns?Z.image.height:null,et=x[M.type];M.precision!==null&&(m=r.getMaxPrecision(M.precision),m!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",m,"instead."));const rt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ht=rt!==void 0?rt.length:0;let Rt=0;H.morphAttributes.position!==void 0&&(Rt=1),H.morphAttributes.normal!==void 0&&(Rt=2),H.morphAttributes.color!==void 0&&(Rt=3);let Gt,Yt,Dt,$;if(et){const Kt=wn[et];Gt=Kt.vertexShader,Yt=Kt.fragmentShader}else Gt=M.vertexShader,Yt=M.fragmentShader,l.update(M),Dt=l.getVertexShaderID(M),$=l.getFragmentShaderID(M);const nt=n.getRenderTarget(),ut=n.state.buffers.depth.getReversed(),Tt=O.isInstancedMesh===!0,_t=O.isBatchedMesh===!0,jt=!!M.map,ae=!!M.matcap,F=!!Z,pe=!!M.aoMap,Ut=!!M.lightMap,Nt=!!M.bumpMap,Et=!!M.normalMap,de=!!M.displacementMap,yt=!!M.emissiveMap,Vt=!!M.metalnessMap,ye=!!M.roughnessMap,qt=M.anisotropy>0,D=M.clearcoat>0,S=M.dispersion>0,W=M.iridescence>0,Q=M.sheen>0,it=M.transmission>0,J=qt&&!!M.anisotropyMap,wt=D&&!!M.clearcoatMap,ct=D&&!!M.clearcoatNormalMap,Ct=D&&!!M.clearcoatRoughnessMap,xt=W&&!!M.iridescenceMap,ot=W&&!!M.iridescenceThicknessMap,pt=Q&&!!M.sheenColorMap,Ot=Q&&!!M.sheenRoughnessMap,bt=!!M.specularMap,dt=!!M.specularColorMap,Wt=!!M.specularIntensityMap,I=it&&!!M.transmissionMap,K=it&&!!M.thicknessMap,j=!!M.gradientMap,at=!!M.alphaMap,tt=M.alphaTest>0,Y=!!M.alphaHash,ft=!!M.extensions;let Pt=li;M.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(Pt=n.toneMapping);const se={shaderID:et,shaderType:M.type,shaderName:M.name,vertexShader:Gt,fragmentShader:Yt,defines:M.defines,customVertexShaderID:Dt,customFragmentShaderID:$,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:m,batching:_t,batchingColor:_t&&O._colorsTexture!==null,instancing:Tt,instancingColor:Tt&&O.instanceColor!==null,instancingMorph:Tt&&O.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:nt===null?n.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:ur,alphaToCoverage:!!M.alphaToCoverage,map:jt,matcap:ae,envMap:F,envMapMode:F&&Z.mapping,envMapCubeUVHeight:V,aoMap:pe,lightMap:Ut,bumpMap:Nt,normalMap:Et,displacementMap:f&&de,emissiveMap:yt,normalMapObjectSpace:Et&&M.normalMapType===Uu,normalMapTangentSpace:Et&&M.normalMapType===ah,metalnessMap:Vt,roughnessMap:ye,anisotropy:qt,anisotropyMap:J,clearcoat:D,clearcoatMap:wt,clearcoatNormalMap:ct,clearcoatRoughnessMap:Ct,dispersion:S,iridescence:W,iridescenceMap:xt,iridescenceThicknessMap:ot,sheen:Q,sheenColorMap:pt,sheenRoughnessMap:Ot,specularMap:bt,specularColorMap:dt,specularIntensityMap:Wt,transmission:it,transmissionMap:I,thicknessMap:K,gradientMap:j,opaque:M.transparent===!1&&M.blending===or&&M.alphaToCoverage===!1,alphaMap:at,alphaTest:tt,alphaHash:Y,combine:M.combine,mapUv:jt&&v(M.map.channel),aoMapUv:pe&&v(M.aoMap.channel),lightMapUv:Ut&&v(M.lightMap.channel),bumpMapUv:Nt&&v(M.bumpMap.channel),normalMapUv:Et&&v(M.normalMap.channel),displacementMapUv:de&&v(M.displacementMap.channel),emissiveMapUv:yt&&v(M.emissiveMap.channel),metalnessMapUv:Vt&&v(M.metalnessMap.channel),roughnessMapUv:ye&&v(M.roughnessMap.channel),anisotropyMapUv:J&&v(M.anisotropyMap.channel),clearcoatMapUv:wt&&v(M.clearcoatMap.channel),clearcoatNormalMapUv:ct&&v(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ct&&v(M.clearcoatRoughnessMap.channel),iridescenceMapUv:xt&&v(M.iridescenceMap.channel),iridescenceThicknessMapUv:ot&&v(M.iridescenceThicknessMap.channel),sheenColorMapUv:pt&&v(M.sheenColorMap.channel),sheenRoughnessMapUv:Ot&&v(M.sheenRoughnessMap.channel),specularMapUv:bt&&v(M.specularMap.channel),specularColorMapUv:dt&&v(M.specularColorMap.channel),specularIntensityMapUv:Wt&&v(M.specularIntensityMap.channel),transmissionMapUv:I&&v(M.transmissionMap.channel),thicknessMapUv:K&&v(M.thicknessMap.channel),alphaMapUv:at&&v(M.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(Et||qt),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!H.attributes.uv&&(jt||at),fog:!!k,useFog:M.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:ut,skinning:O.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:ht,morphTextureStride:Rt,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&u.length>0,shadowMapType:n.shadowMap.type,toneMapping:Pt,decodeVideoTexture:jt&&M.map.isVideoTexture===!0&&he.getTransfer(M.map.colorSpace)===me,decodeVideoTextureEmissive:yt&&M.emissiveMap.isVideoTexture===!0&&he.getTransfer(M.emissiveMap.colorSpace)===me,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Mn,flipSided:M.side===Qe,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:ft&&M.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ft&&M.extensions.multiDraw===!0||_t)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return se.vertexUv1s=c.has(1),se.vertexUv2s=c.has(2),se.vertexUv3s=c.has(3),c.clear(),se}function p(M){const _=[];if(M.shaderID?_.push(M.shaderID):(_.push(M.customVertexShaderID),_.push(M.customFragmentShaderID)),M.defines!==void 0)for(const u in M.defines)_.push(u),_.push(M.defines[u]);return M.isRawShaderMaterial===!1&&(A(_,M),T(_,M),_.push(n.outputColorSpace)),_.push(M.customProgramCacheKey),_.join()}function A(M,_){M.push(_.precision),M.push(_.outputColorSpace),M.push(_.envMapMode),M.push(_.envMapCubeUVHeight),M.push(_.mapUv),M.push(_.alphaMapUv),M.push(_.lightMapUv),M.push(_.aoMapUv),M.push(_.bumpMapUv),M.push(_.normalMapUv),M.push(_.displacementMapUv),M.push(_.emissiveMapUv),M.push(_.metalnessMapUv),M.push(_.roughnessMapUv),M.push(_.anisotropyMapUv),M.push(_.clearcoatMapUv),M.push(_.clearcoatNormalMapUv),M.push(_.clearcoatRoughnessMapUv),M.push(_.iridescenceMapUv),M.push(_.iridescenceThicknessMapUv),M.push(_.sheenColorMapUv),M.push(_.sheenRoughnessMapUv),M.push(_.specularMapUv),M.push(_.specularColorMapUv),M.push(_.specularIntensityMapUv),M.push(_.transmissionMapUv),M.push(_.thicknessMapUv),M.push(_.combine),M.push(_.fogExp2),M.push(_.sizeAttenuation),M.push(_.morphTargetsCount),M.push(_.morphAttributeCount),M.push(_.numDirLights),M.push(_.numPointLights),M.push(_.numSpotLights),M.push(_.numSpotLightMaps),M.push(_.numHemiLights),M.push(_.numRectAreaLights),M.push(_.numDirLightShadows),M.push(_.numPointLightShadows),M.push(_.numSpotLightShadows),M.push(_.numSpotLightShadowsWithMaps),M.push(_.numLightProbes),M.push(_.shadowMapType),M.push(_.toneMapping),M.push(_.numClippingPlanes),M.push(_.numClipIntersection),M.push(_.depthPacking)}function T(M,_){a.disableAll(),_.supportsVertexTextures&&a.enable(0),_.instancing&&a.enable(1),_.instancingColor&&a.enable(2),_.instancingMorph&&a.enable(3),_.matcap&&a.enable(4),_.envMap&&a.enable(5),_.normalMapObjectSpace&&a.enable(6),_.normalMapTangentSpace&&a.enable(7),_.clearcoat&&a.enable(8),_.iridescence&&a.enable(9),_.alphaTest&&a.enable(10),_.vertexColors&&a.enable(11),_.vertexAlphas&&a.enable(12),_.vertexUv1s&&a.enable(13),_.vertexUv2s&&a.enable(14),_.vertexUv3s&&a.enable(15),_.vertexTangents&&a.enable(16),_.anisotropy&&a.enable(17),_.alphaHash&&a.enable(18),_.batching&&a.enable(19),_.dispersion&&a.enable(20),_.batchingColor&&a.enable(21),_.gradientMap&&a.enable(22),M.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.reversedDepthBuffer&&a.enable(4),_.skinning&&a.enable(5),_.morphTargets&&a.enable(6),_.morphNormals&&a.enable(7),_.morphColors&&a.enable(8),_.premultipliedAlpha&&a.enable(9),_.shadowMapEnabled&&a.enable(10),_.doubleSided&&a.enable(11),_.flipSided&&a.enable(12),_.useDepthPacking&&a.enable(13),_.dithering&&a.enable(14),_.transmission&&a.enable(15),_.sheen&&a.enable(16),_.opaque&&a.enable(17),_.pointsUvs&&a.enable(18),_.decodeVideoTexture&&a.enable(19),_.decodeVideoTextureEmissive&&a.enable(20),_.alphaToCoverage&&a.enable(21),M.push(a.mask)}function y(M){const _=x[M.type];let u;if(_){const N=wn[_];u=Ed.clone(N.uniforms)}else u=M.uniforms;return u}function L(M,_){let u;for(let N=0,O=d.length;N<O;N++){const k=d[N];if(k.cacheKey===_){u=k,++u.usedTimes;break}}return u===void 0&&(u=new Pg(n,_,M,o),d.push(u)),u}function b(M){if(--M.usedTimes===0){const _=d.indexOf(M);d[_]=d[d.length-1],d.pop(),M.destroy()}}function C(M){l.remove(M)}function U(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:y,acquireProgram:L,releaseProgram:b,releaseShaderCache:C,programs:d,dispose:U}}function Ng(){let n=new WeakMap;function t(s){return n.has(s)}function e(s){let a=n.get(s);return a===void 0&&(a={},n.set(s,a)),a}function i(s){n.delete(s)}function r(s,a,l){n.get(s)[a]=l}function o(){n=new WeakMap}return{has:t,get:e,remove:i,update:r,dispose:o}}function Fg(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function gc(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function _c(){const n=[];let t=0;const e=[],i=[],r=[];function o(){t=0,e.length=0,i.length=0,r.length=0}function s(h,f,m,x,v,g){let p=n[t];return p===void 0?(p={id:h.id,object:h,geometry:f,material:m,groupOrder:x,renderOrder:h.renderOrder,z:v,group:g},n[t]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=m,p.groupOrder=x,p.renderOrder=h.renderOrder,p.z=v,p.group=g),t++,p}function a(h,f,m,x,v,g){const p=s(h,f,m,x,v,g);m.transmission>0?i.push(p):m.transparent===!0?r.push(p):e.push(p)}function l(h,f,m,x,v,g){const p=s(h,f,m,x,v,g);m.transmission>0?i.unshift(p):m.transparent===!0?r.unshift(p):e.unshift(p)}function c(h,f){e.length>1&&e.sort(h||Fg),i.length>1&&i.sort(f||gc),r.length>1&&r.sort(f||gc)}function d(){for(let h=t,f=n.length;h<f;h++){const m=n[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:i,transparent:r,init:o,push:a,unshift:l,finish:d,sort:c}}function Og(){let n=new WeakMap;function t(i,r){const o=n.get(i);let s;return o===void 0?(s=new _c,n.set(i,[s])):r>=o.length?(s=new _c,o.push(s)):s=o[r],s}function e(){n=new WeakMap}return{get:t,dispose:e}}function Bg(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new E,color:new ne};break;case"SpotLight":e={position:new E,direction:new E,color:new ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new E,color:new ne,distance:0,decay:0};break;case"HemisphereLight":e={direction:new E,skyColor:new ne,groundColor:new ne};break;case"RectAreaLight":e={color:new ne,position:new E,halfWidth:new E,halfHeight:new E};break}return n[t.id]=e,e}}}function zg(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let kg=0;function Hg(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Vg(n){const t=new Bg,e=zg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new E);const r=new E,o=new Me,s=new Me;function a(c){let d=0,h=0,f=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let m=0,x=0,v=0,g=0,p=0,A=0,T=0,y=0,L=0,b=0,C=0;c.sort(Hg);for(let M=0,_=c.length;M<_;M++){const u=c[M],N=u.color,O=u.intensity,k=u.distance,H=u.shadow&&u.shadow.map?u.shadow.map.texture:null;if(u.isAmbientLight)d+=N.r*O,h+=N.g*O,f+=N.b*O;else if(u.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(u.sh.coefficients[G],O);C++}else if(u.isDirectionalLight){const G=t.get(u);if(G.color.copy(u.color).multiplyScalar(u.intensity),u.castShadow){const Z=u.shadow,V=e.get(u);V.shadowIntensity=Z.intensity,V.shadowBias=Z.bias,V.shadowNormalBias=Z.normalBias,V.shadowRadius=Z.radius,V.shadowMapSize=Z.mapSize,i.directionalShadow[m]=V,i.directionalShadowMap[m]=H,i.directionalShadowMatrix[m]=u.shadow.matrix,A++}i.directional[m]=G,m++}else if(u.isSpotLight){const G=t.get(u);G.position.setFromMatrixPosition(u.matrixWorld),G.color.copy(N).multiplyScalar(O),G.distance=k,G.coneCos=Math.cos(u.angle),G.penumbraCos=Math.cos(u.angle*(1-u.penumbra)),G.decay=u.decay,i.spot[v]=G;const Z=u.shadow;if(u.map&&(i.spotLightMap[L]=u.map,L++,Z.updateMatrices(u),u.castShadow&&b++),i.spotLightMatrix[v]=Z.matrix,u.castShadow){const V=e.get(u);V.shadowIntensity=Z.intensity,V.shadowBias=Z.bias,V.shadowNormalBias=Z.normalBias,V.shadowRadius=Z.radius,V.shadowMapSize=Z.mapSize,i.spotShadow[v]=V,i.spotShadowMap[v]=H,y++}v++}else if(u.isRectAreaLight){const G=t.get(u);G.color.copy(N).multiplyScalar(O),G.halfWidth.set(u.width*.5,0,0),G.halfHeight.set(0,u.height*.5,0),i.rectArea[g]=G,g++}else if(u.isPointLight){const G=t.get(u);if(G.color.copy(u.color).multiplyScalar(u.intensity),G.distance=u.distance,G.decay=u.decay,u.castShadow){const Z=u.shadow,V=e.get(u);V.shadowIntensity=Z.intensity,V.shadowBias=Z.bias,V.shadowNormalBias=Z.normalBias,V.shadowRadius=Z.radius,V.shadowMapSize=Z.mapSize,V.shadowCameraNear=Z.camera.near,V.shadowCameraFar=Z.camera.far,i.pointShadow[x]=V,i.pointShadowMap[x]=H,i.pointShadowMatrix[x]=u.shadow.matrix,T++}i.point[x]=G,x++}else if(u.isHemisphereLight){const G=t.get(u);G.skyColor.copy(u.color).multiplyScalar(O),G.groundColor.copy(u.groundColor).multiplyScalar(O),i.hemi[p]=G,p++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=mt.LTC_FLOAT_1,i.rectAreaLTC2=mt.LTC_FLOAT_2):(i.rectAreaLTC1=mt.LTC_HALF_1,i.rectAreaLTC2=mt.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=f;const U=i.hash;(U.directionalLength!==m||U.pointLength!==x||U.spotLength!==v||U.rectAreaLength!==g||U.hemiLength!==p||U.numDirectionalShadows!==A||U.numPointShadows!==T||U.numSpotShadows!==y||U.numSpotMaps!==L||U.numLightProbes!==C)&&(i.directional.length=m,i.spot.length=v,i.rectArea.length=g,i.point.length=x,i.hemi.length=p,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=A,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=y+L-b,i.spotLightMap.length=L,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=C,U.directionalLength=m,U.pointLength=x,U.spotLength=v,U.rectAreaLength=g,U.hemiLength=p,U.numDirectionalShadows=A,U.numPointShadows=T,U.numSpotShadows=y,U.numSpotMaps=L,U.numLightProbes=C,i.version=kg++)}function l(c,d){let h=0,f=0,m=0,x=0,v=0;const g=d.matrixWorldInverse;for(let p=0,A=c.length;p<A;p++){const T=c[p];if(T.isDirectionalLight){const y=i.directional[h];y.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(g),h++}else if(T.isSpotLight){const y=i.spot[m];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(g),m++}else if(T.isRectAreaLight){const y=i.rectArea[x];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(g),s.identity(),o.copy(T.matrixWorld),o.premultiply(g),s.extractRotation(o),y.halfWidth.set(T.width*.5,0,0),y.halfHeight.set(0,T.height*.5,0),y.halfWidth.applyMatrix4(s),y.halfHeight.applyMatrix4(s),x++}else if(T.isPointLight){const y=i.point[f];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(g),f++}else if(T.isHemisphereLight){const y=i.hemi[v];y.direction.setFromMatrixPosition(T.matrixWorld),y.direction.transformDirection(g),v++}}}return{setup:a,setupView:l,state:i}}function xc(n){const t=new Vg(n),e=[],i=[];function r(d){c.camera=d,e.length=0,i.length=0}function o(d){e.push(d)}function s(d){i.push(d)}function a(){t.setup(e)}function l(d){t.setupView(e,d)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:o,pushShadow:s}}function Gg(n){let t=new WeakMap;function e(r,o=0){const s=t.get(r);let a;return s===void 0?(a=new xc(n),t.set(r,[a])):o>=s.length?(a=new xc(n),s.push(a)):a=s[o],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const Wg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Xg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Zg(n,t,e){let i=new ol;const r=new vt,o=new vt,s=new Ee,a=new mf({depthPacking:Iu}),l=new gf,c={},d=e.maxTextureSize,h={[hi]:Qe,[Qe]:hi,[Mn]:Mn},f=new ui({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new vt},radius:{value:4}},vertexShader:Wg,fragmentShader:Xg}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const x=new Se;x.setAttribute("position",new En(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ae(x,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Kc;let p=this.type;this.render=function(b,C,U){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;const M=n.getRenderTarget(),_=n.getActiveCubeFace(),u=n.getActiveMipmapLevel(),N=n.state;N.setBlending(ai),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const O=p!==kn&&this.type===kn,k=p===kn&&this.type!==kn;for(let H=0,G=b.length;H<G;H++){const Z=b[H],V=Z.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;r.copy(V.mapSize);const et=V.getFrameExtents();if(r.multiply(et),o.copy(V.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(o.x=Math.floor(d/et.x),r.x=o.x*et.x,V.mapSize.x=o.x),r.y>d&&(o.y=Math.floor(d/et.y),r.y=o.y*et.y,V.mapSize.y=o.y)),V.map===null||O===!0||k===!0){const ht=this.type!==kn?{minFilter:Tn,magFilter:Tn}:{};V.map!==null&&V.map.dispose(),V.map=new Di(r.x,r.y,ht),V.map.texture.name=Z.name+".shadowMap",V.camera.updateProjectionMatrix()}n.setRenderTarget(V.map),n.clear();const rt=V.getViewportCount();for(let ht=0;ht<rt;ht++){const Rt=V.getViewport(ht);s.set(o.x*Rt.x,o.y*Rt.y,o.x*Rt.z,o.y*Rt.w),N.viewport(s),V.updateMatrices(Z,ht),i=V.getFrustum(),y(C,U,V.camera,Z,this.type)}V.isPointLightShadow!==!0&&this.type===kn&&A(V,U),V.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(M,_,u)};function A(b,C){const U=t.update(v);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,m.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Di(r.x,r.y)),f.uniforms.shadow_pass.value=b.map.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(C,null,U,f,v,null),m.uniforms.shadow_pass.value=b.mapPass.texture,m.uniforms.resolution.value=b.mapSize,m.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(C,null,U,m,v,null)}function T(b,C,U,M){let _=null;const u=U.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(u!==void 0)_=u;else if(_=U.isPointLight===!0?l:a,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const N=_.uuid,O=C.uuid;let k=c[N];k===void 0&&(k={},c[N]=k);let H=k[O];H===void 0&&(H=_.clone(),k[O]=H,C.addEventListener("dispose",L)),_=H}if(_.visible=C.visible,_.wireframe=C.wireframe,M===kn?_.side=C.shadowSide!==null?C.shadowSide:C.side:_.side=C.shadowSide!==null?C.shadowSide:h[C.side],_.alphaMap=C.alphaMap,_.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,_.map=C.map,_.clipShadows=C.clipShadows,_.clippingPlanes=C.clippingPlanes,_.clipIntersection=C.clipIntersection,_.displacementMap=C.displacementMap,_.displacementScale=C.displacementScale,_.displacementBias=C.displacementBias,_.wireframeLinewidth=C.wireframeLinewidth,_.linewidth=C.linewidth,U.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const N=n.properties.get(_);N.light=U}return _}function y(b,C,U,M,_){if(b.visible===!1)return;if(b.layers.test(C.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&_===kn)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,b.matrixWorld);const O=t.update(b),k=b.material;if(Array.isArray(k)){const H=O.groups;for(let G=0,Z=H.length;G<Z;G++){const V=H[G],et=k[V.materialIndex];if(et&&et.visible){const rt=T(b,et,M,_);b.onBeforeShadow(n,b,C,U,O,rt,V),n.renderBufferDirect(U,null,O,rt,b,V),b.onAfterShadow(n,b,C,U,O,rt,V)}}}else if(k.visible){const H=T(b,k,M,_);b.onBeforeShadow(n,b,C,U,O,H,null),n.renderBufferDirect(U,null,O,H,b,null),b.onAfterShadow(n,b,C,U,O,H,null)}}const N=b.children;for(let O=0,k=N.length;O<k;O++)y(N[O],C,U,M,_)}function L(b){b.target.removeEventListener("dispose",L);for(const U in c){const M=c[U],_=b.target.uuid;_ in M&&(M[_].dispose(),delete M[_])}}}const Yg={[Qs]:ta,[ea]:ra,[na]:oa,[lr]:ia,[ta]:Qs,[ra]:ea,[oa]:na,[ia]:lr};function qg(n,t){function e(){let I=!1;const K=new Ee;let j=null;const at=new Ee(0,0,0,0);return{setMask:function(tt){j!==tt&&!I&&(n.colorMask(tt,tt,tt,tt),j=tt)},setLocked:function(tt){I=tt},setClear:function(tt,Y,ft,Pt,se){se===!0&&(tt*=Pt,Y*=Pt,ft*=Pt),K.set(tt,Y,ft,Pt),at.equals(K)===!1&&(n.clearColor(tt,Y,ft,Pt),at.copy(K))},reset:function(){I=!1,j=null,at.set(-1,0,0,0)}}}function i(){let I=!1,K=!1,j=null,at=null,tt=null;return{setReversed:function(Y){if(K!==Y){const ft=t.get("EXT_clip_control");Y?ft.clipControlEXT(ft.LOWER_LEFT_EXT,ft.ZERO_TO_ONE_EXT):ft.clipControlEXT(ft.LOWER_LEFT_EXT,ft.NEGATIVE_ONE_TO_ONE_EXT),K=Y;const Pt=tt;tt=null,this.setClear(Pt)}},getReversed:function(){return K},setTest:function(Y){Y?nt(n.DEPTH_TEST):ut(n.DEPTH_TEST)},setMask:function(Y){j!==Y&&!I&&(n.depthMask(Y),j=Y)},setFunc:function(Y){if(K&&(Y=Yg[Y]),at!==Y){switch(Y){case Qs:n.depthFunc(n.NEVER);break;case ta:n.depthFunc(n.ALWAYS);break;case ea:n.depthFunc(n.LESS);break;case lr:n.depthFunc(n.LEQUAL);break;case na:n.depthFunc(n.EQUAL);break;case ia:n.depthFunc(n.GEQUAL);break;case ra:n.depthFunc(n.GREATER);break;case oa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}at=Y}},setLocked:function(Y){I=Y},setClear:function(Y){tt!==Y&&(K&&(Y=1-Y),n.clearDepth(Y),tt=Y)},reset:function(){I=!1,j=null,at=null,tt=null,K=!1}}}function r(){let I=!1,K=null,j=null,at=null,tt=null,Y=null,ft=null,Pt=null,se=null;return{setTest:function(Kt){I||(Kt?nt(n.STENCIL_TEST):ut(n.STENCIL_TEST))},setMask:function(Kt){K!==Kt&&!I&&(n.stencilMask(Kt),K=Kt)},setFunc:function(Kt,be,Be){(j!==Kt||at!==be||tt!==Be)&&(n.stencilFunc(Kt,be,Be),j=Kt,at=be,tt=Be)},setOp:function(Kt,be,Be){(Y!==Kt||ft!==be||Pt!==Be)&&(n.stencilOp(Kt,be,Be),Y=Kt,ft=be,Pt=Be)},setLocked:function(Kt){I=Kt},setClear:function(Kt){se!==Kt&&(n.clearStencil(Kt),se=Kt)},reset:function(){I=!1,K=null,j=null,at=null,tt=null,Y=null,ft=null,Pt=null,se=null}}}const o=new e,s=new i,a=new r,l=new WeakMap,c=new WeakMap;let d={},h={},f=new WeakMap,m=[],x=null,v=!1,g=null,p=null,A=null,T=null,y=null,L=null,b=null,C=new ne(0,0,0),U=0,M=!1,_=null,u=null,N=null,O=null,k=null;const H=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,Z=0;const V=n.getParameter(n.VERSION);V.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(V)[1]),G=Z>=1):V.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),G=Z>=2);let et=null,rt={};const ht=n.getParameter(n.SCISSOR_BOX),Rt=n.getParameter(n.VIEWPORT),Gt=new Ee().fromArray(ht),Yt=new Ee().fromArray(Rt);function Dt(I,K,j,at){const tt=new Uint8Array(4),Y=n.createTexture();n.bindTexture(I,Y),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ft=0;ft<j;ft++)I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY?n.texImage3D(K,0,n.RGBA,1,1,at,0,n.RGBA,n.UNSIGNED_BYTE,tt):n.texImage2D(K+ft,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,tt);return Y}const $={};$[n.TEXTURE_2D]=Dt(n.TEXTURE_2D,n.TEXTURE_2D,1),$[n.TEXTURE_CUBE_MAP]=Dt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[n.TEXTURE_2D_ARRAY]=Dt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),$[n.TEXTURE_3D]=Dt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),o.setClear(0,0,0,1),s.setClear(1),a.setClear(0),nt(n.DEPTH_TEST),s.setFunc(lr),Nt(!1),Et(fl),nt(n.CULL_FACE),pe(ai);function nt(I){d[I]!==!0&&(n.enable(I),d[I]=!0)}function ut(I){d[I]!==!1&&(n.disable(I),d[I]=!1)}function Tt(I,K){return h[I]!==K?(n.bindFramebuffer(I,K),h[I]=K,I===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=K),I===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=K),!0):!1}function _t(I,K){let j=m,at=!1;if(I){j=f.get(K),j===void 0&&(j=[],f.set(K,j));const tt=I.textures;if(j.length!==tt.length||j[0]!==n.COLOR_ATTACHMENT0){for(let Y=0,ft=tt.length;Y<ft;Y++)j[Y]=n.COLOR_ATTACHMENT0+Y;j.length=tt.length,at=!0}}else j[0]!==n.BACK&&(j[0]=n.BACK,at=!0);at&&n.drawBuffers(j)}function jt(I){return x!==I?(n.useProgram(I),x=I,!0):!1}const ae={[bi]:n.FUNC_ADD,[ou]:n.FUNC_SUBTRACT,[su]:n.FUNC_REVERSE_SUBTRACT};ae[au]=n.MIN,ae[lu]=n.MAX;const F={[cu]:n.ZERO,[hu]:n.ONE,[uu]:n.SRC_COLOR,[$s]:n.SRC_ALPHA,[_u]:n.SRC_ALPHA_SATURATE,[mu]:n.DST_COLOR,[fu]:n.DST_ALPHA,[du]:n.ONE_MINUS_SRC_COLOR,[js]:n.ONE_MINUS_SRC_ALPHA,[gu]:n.ONE_MINUS_DST_COLOR,[pu]:n.ONE_MINUS_DST_ALPHA,[xu]:n.CONSTANT_COLOR,[vu]:n.ONE_MINUS_CONSTANT_COLOR,[Mu]:n.CONSTANT_ALPHA,[yu]:n.ONE_MINUS_CONSTANT_ALPHA};function pe(I,K,j,at,tt,Y,ft,Pt,se,Kt){if(I===ai){v===!0&&(ut(n.BLEND),v=!1);return}if(v===!1&&(nt(n.BLEND),v=!0),I!==ru){if(I!==g||Kt!==M){if((p!==bi||y!==bi)&&(n.blendEquation(n.FUNC_ADD),p=bi,y=bi),Kt)switch(I){case or:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case pl:n.blendFunc(n.ONE,n.ONE);break;case ml:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case gl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case or:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case pl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case ml:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case gl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}A=null,T=null,L=null,b=null,C.set(0,0,0),U=0,g=I,M=Kt}return}tt=tt||K,Y=Y||j,ft=ft||at,(K!==p||tt!==y)&&(n.blendEquationSeparate(ae[K],ae[tt]),p=K,y=tt),(j!==A||at!==T||Y!==L||ft!==b)&&(n.blendFuncSeparate(F[j],F[at],F[Y],F[ft]),A=j,T=at,L=Y,b=ft),(Pt.equals(C)===!1||se!==U)&&(n.blendColor(Pt.r,Pt.g,Pt.b,se),C.copy(Pt),U=se),g=I,M=!1}function Ut(I,K){I.side===Mn?ut(n.CULL_FACE):nt(n.CULL_FACE);let j=I.side===Qe;K&&(j=!j),Nt(j),I.blending===or&&I.transparent===!1?pe(ai):pe(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),s.setFunc(I.depthFunc),s.setTest(I.depthTest),s.setMask(I.depthWrite),o.setMask(I.colorWrite);const at=I.stencilWrite;a.setTest(at),at&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),yt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?nt(n.SAMPLE_ALPHA_TO_COVERAGE):ut(n.SAMPLE_ALPHA_TO_COVERAGE)}function Nt(I){_!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),_=I)}function Et(I){I!==nu?(nt(n.CULL_FACE),I!==u&&(I===fl?n.cullFace(n.BACK):I===iu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ut(n.CULL_FACE),u=I}function de(I){I!==N&&(G&&n.lineWidth(I),N=I)}function yt(I,K,j){I?(nt(n.POLYGON_OFFSET_FILL),(O!==K||k!==j)&&(n.polygonOffset(K,j),O=K,k=j)):ut(n.POLYGON_OFFSET_FILL)}function Vt(I){I?nt(n.SCISSOR_TEST):ut(n.SCISSOR_TEST)}function ye(I){I===void 0&&(I=n.TEXTURE0+H-1),et!==I&&(n.activeTexture(I),et=I)}function qt(I,K,j){j===void 0&&(et===null?j=n.TEXTURE0+H-1:j=et);let at=rt[j];at===void 0&&(at={type:void 0,texture:void 0},rt[j]=at),(at.type!==I||at.texture!==K)&&(et!==j&&(n.activeTexture(j),et=j),n.bindTexture(I,K||$[I]),at.type=I,at.texture=K)}function D(){const I=rt[et];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function S(){try{n.compressedTexImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function W(){try{n.compressedTexImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Q(){try{n.texSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function it(){try{n.texSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function J(){try{n.compressedTexSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function wt(){try{n.compressedTexSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ct(){try{n.texStorage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ct(){try{n.texStorage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function xt(){try{n.texImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ot(){try{n.texImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function pt(I){Gt.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),Gt.copy(I))}function Ot(I){Yt.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),Yt.copy(I))}function bt(I,K){let j=c.get(K);j===void 0&&(j=new WeakMap,c.set(K,j));let at=j.get(I);at===void 0&&(at=n.getUniformBlockIndex(K,I.name),j.set(I,at))}function dt(I,K){const at=c.get(K).get(I);l.get(K)!==at&&(n.uniformBlockBinding(K,at,I.__bindingPointIndex),l.set(K,at))}function Wt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),s.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},et=null,rt={},h={},f=new WeakMap,m=[],x=null,v=!1,g=null,p=null,A=null,T=null,y=null,L=null,b=null,C=new ne(0,0,0),U=0,M=!1,_=null,u=null,N=null,O=null,k=null,Gt.set(0,0,n.canvas.width,n.canvas.height),Yt.set(0,0,n.canvas.width,n.canvas.height),o.reset(),s.reset(),a.reset()}return{buffers:{color:o,depth:s,stencil:a},enable:nt,disable:ut,bindFramebuffer:Tt,drawBuffers:_t,useProgram:jt,setBlending:pe,setMaterial:Ut,setFlipSided:Nt,setCullFace:Et,setLineWidth:de,setPolygonOffset:yt,setScissorTest:Vt,activeTexture:ye,bindTexture:qt,unbindTexture:D,compressedTexImage2D:S,compressedTexImage3D:W,texImage2D:xt,texImage3D:ot,updateUBOMapping:bt,uniformBlockBinding:dt,texStorage2D:ct,texStorage3D:Ct,texSubImage2D:Q,texSubImage3D:it,compressedTexSubImage2D:J,compressedTexSubImage3D:wt,scissor:pt,viewport:Ot,reset:Wt}}function Kg(n,t,e,i,r,o,s){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new vt,d=new WeakMap;let h;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(D,S){return m?new OffscreenCanvas(D,S):Yo("canvas")}function v(D,S,W){let Q=1;const it=qt(D);if((it.width>W||it.height>W)&&(Q=W/Math.max(it.width,it.height)),Q<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const J=Math.floor(Q*it.width),wt=Math.floor(Q*it.height);h===void 0&&(h=x(J,wt));const ct=S?x(J,wt):h;return ct.width=J,ct.height=wt,ct.getContext("2d").drawImage(D,0,0,J,wt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+J+"x"+wt+")."),ct}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),D;return D}function g(D){return D.generateMipmaps}function p(D){n.generateMipmap(D)}function A(D){return D.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?n.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function T(D,S,W,Q,it=!1){if(D!==null){if(n[D]!==void 0)return n[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let J=S;if(S===n.RED&&(W===n.FLOAT&&(J=n.R32F),W===n.HALF_FLOAT&&(J=n.R16F),W===n.UNSIGNED_BYTE&&(J=n.R8)),S===n.RED_INTEGER&&(W===n.UNSIGNED_BYTE&&(J=n.R8UI),W===n.UNSIGNED_SHORT&&(J=n.R16UI),W===n.UNSIGNED_INT&&(J=n.R32UI),W===n.BYTE&&(J=n.R8I),W===n.SHORT&&(J=n.R16I),W===n.INT&&(J=n.R32I)),S===n.RG&&(W===n.FLOAT&&(J=n.RG32F),W===n.HALF_FLOAT&&(J=n.RG16F),W===n.UNSIGNED_BYTE&&(J=n.RG8)),S===n.RG_INTEGER&&(W===n.UNSIGNED_BYTE&&(J=n.RG8UI),W===n.UNSIGNED_SHORT&&(J=n.RG16UI),W===n.UNSIGNED_INT&&(J=n.RG32UI),W===n.BYTE&&(J=n.RG8I),W===n.SHORT&&(J=n.RG16I),W===n.INT&&(J=n.RG32I)),S===n.RGB_INTEGER&&(W===n.UNSIGNED_BYTE&&(J=n.RGB8UI),W===n.UNSIGNED_SHORT&&(J=n.RGB16UI),W===n.UNSIGNED_INT&&(J=n.RGB32UI),W===n.BYTE&&(J=n.RGB8I),W===n.SHORT&&(J=n.RGB16I),W===n.INT&&(J=n.RGB32I)),S===n.RGBA_INTEGER&&(W===n.UNSIGNED_BYTE&&(J=n.RGBA8UI),W===n.UNSIGNED_SHORT&&(J=n.RGBA16UI),W===n.UNSIGNED_INT&&(J=n.RGBA32UI),W===n.BYTE&&(J=n.RGBA8I),W===n.SHORT&&(J=n.RGBA16I),W===n.INT&&(J=n.RGBA32I)),S===n.RGB&&(W===n.UNSIGNED_INT_5_9_9_9_REV&&(J=n.RGB9_E5),W===n.UNSIGNED_INT_10F_11F_11F_REV&&(J=n.R11F_G11F_B10F)),S===n.RGBA){const wt=it?Xo:he.getTransfer(Q);W===n.FLOAT&&(J=n.RGBA32F),W===n.HALF_FLOAT&&(J=n.RGBA16F),W===n.UNSIGNED_BYTE&&(J=wt===me?n.SRGB8_ALPHA8:n.RGBA8),W===n.UNSIGNED_SHORT_4_4_4_4&&(J=n.RGBA4),W===n.UNSIGNED_SHORT_5_5_5_1&&(J=n.RGB5_A1)}return(J===n.R16F||J===n.R32F||J===n.RG16F||J===n.RG32F||J===n.RGBA16F||J===n.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function y(D,S){let W;return D?S===null||S===Li||S===Vr?W=n.DEPTH24_STENCIL8:S===Vn?W=n.DEPTH32F_STENCIL8:S===Hr&&(W=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Li||S===Vr?W=n.DEPTH_COMPONENT24:S===Vn?W=n.DEPTH_COMPONENT32F:S===Hr&&(W=n.DEPTH_COMPONENT16),W}function L(D,S){return g(D)===!0||D.isFramebufferTexture&&D.minFilter!==Tn&&D.minFilter!==Cn?Math.log2(Math.max(S.width,S.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?S.mipmaps.length:1}function b(D){const S=D.target;S.removeEventListener("dispose",b),U(S),S.isVideoTexture&&d.delete(S)}function C(D){const S=D.target;S.removeEventListener("dispose",C),_(S)}function U(D){const S=i.get(D);if(S.__webglInit===void 0)return;const W=D.source,Q=f.get(W);if(Q){const it=Q[S.__cacheKey];it.usedTimes--,it.usedTimes===0&&M(D),Object.keys(Q).length===0&&f.delete(W)}i.remove(D)}function M(D){const S=i.get(D);n.deleteTexture(S.__webglTexture);const W=D.source,Q=f.get(W);delete Q[S.__cacheKey],s.memory.textures--}function _(D){const S=i.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),i.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(S.__webglFramebuffer[Q]))for(let it=0;it<S.__webglFramebuffer[Q].length;it++)n.deleteFramebuffer(S.__webglFramebuffer[Q][it]);else n.deleteFramebuffer(S.__webglFramebuffer[Q]);S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer[Q])}else{if(Array.isArray(S.__webglFramebuffer))for(let Q=0;Q<S.__webglFramebuffer.length;Q++)n.deleteFramebuffer(S.__webglFramebuffer[Q]);else n.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&n.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Q=0;Q<S.__webglColorRenderbuffer.length;Q++)S.__webglColorRenderbuffer[Q]&&n.deleteRenderbuffer(S.__webglColorRenderbuffer[Q]);S.__webglDepthRenderbuffer&&n.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const W=D.textures;for(let Q=0,it=W.length;Q<it;Q++){const J=i.get(W[Q]);J.__webglTexture&&(n.deleteTexture(J.__webglTexture),s.memory.textures--),i.remove(W[Q])}i.remove(D)}let u=0;function N(){u=0}function O(){const D=u;return D>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+r.maxTextures),u+=1,D}function k(D){const S=[];return S.push(D.wrapS),S.push(D.wrapT),S.push(D.wrapR||0),S.push(D.magFilter),S.push(D.minFilter),S.push(D.anisotropy),S.push(D.internalFormat),S.push(D.format),S.push(D.type),S.push(D.generateMipmaps),S.push(D.premultiplyAlpha),S.push(D.flipY),S.push(D.unpackAlignment),S.push(D.colorSpace),S.join()}function H(D,S){const W=i.get(D);if(D.isVideoTexture&&Vt(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&W.__version!==D.version){const Q=D.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(W,D,S);return}}else D.isExternalTexture&&(W.__webglTexture=D.sourceTexture?D.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,W.__webglTexture,n.TEXTURE0+S)}function G(D,S){const W=i.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&W.__version!==D.version){$(W,D,S);return}e.bindTexture(n.TEXTURE_2D_ARRAY,W.__webglTexture,n.TEXTURE0+S)}function Z(D,S){const W=i.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&W.__version!==D.version){$(W,D,S);return}e.bindTexture(n.TEXTURE_3D,W.__webglTexture,n.TEXTURE0+S)}function V(D,S){const W=i.get(D);if(D.version>0&&W.__version!==D.version){nt(W,D,S);return}e.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture,n.TEXTURE0+S)}const et={[la]:n.REPEAT,[Ri]:n.CLAMP_TO_EDGE,[ca]:n.MIRRORED_REPEAT},rt={[Tn]:n.NEAREST,[Lu]:n.NEAREST_MIPMAP_NEAREST,[oo]:n.NEAREST_MIPMAP_LINEAR,[Cn]:n.LINEAR,[cs]:n.LINEAR_MIPMAP_NEAREST,[Ci]:n.LINEAR_MIPMAP_LINEAR},ht={[Nu]:n.NEVER,[Hu]:n.ALWAYS,[Fu]:n.LESS,[lh]:n.LEQUAL,[Ou]:n.EQUAL,[ku]:n.GEQUAL,[Bu]:n.GREATER,[zu]:n.NOTEQUAL};function Rt(D,S){if(S.type===Vn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Cn||S.magFilter===cs||S.magFilter===oo||S.magFilter===Ci||S.minFilter===Cn||S.minFilter===cs||S.minFilter===oo||S.minFilter===Ci)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(D,n.TEXTURE_WRAP_S,et[S.wrapS]),n.texParameteri(D,n.TEXTURE_WRAP_T,et[S.wrapT]),(D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY)&&n.texParameteri(D,n.TEXTURE_WRAP_R,et[S.wrapR]),n.texParameteri(D,n.TEXTURE_MAG_FILTER,rt[S.magFilter]),n.texParameteri(D,n.TEXTURE_MIN_FILTER,rt[S.minFilter]),S.compareFunction&&(n.texParameteri(D,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(D,n.TEXTURE_COMPARE_FUNC,ht[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Tn||S.minFilter!==oo&&S.minFilter!==Ci||S.type===Vn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const W=t.get("EXT_texture_filter_anisotropic");n.texParameterf(D,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function Gt(D,S){let W=!1;D.__webglInit===void 0&&(D.__webglInit=!0,S.addEventListener("dispose",b));const Q=S.source;let it=f.get(Q);it===void 0&&(it={},f.set(Q,it));const J=k(S);if(J!==D.__cacheKey){it[J]===void 0&&(it[J]={texture:n.createTexture(),usedTimes:0},s.memory.textures++,W=!0),it[J].usedTimes++;const wt=it[D.__cacheKey];wt!==void 0&&(it[D.__cacheKey].usedTimes--,wt.usedTimes===0&&M(S)),D.__cacheKey=J,D.__webglTexture=it[J].texture}return W}function Yt(D,S,W){return Math.floor(Math.floor(D/W)/S)}function Dt(D,S,W,Q){const J=D.updateRanges;if(J.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,S.width,S.height,W,Q,S.data);else{J.sort((ot,pt)=>ot.start-pt.start);let wt=0;for(let ot=1;ot<J.length;ot++){const pt=J[wt],Ot=J[ot],bt=pt.start+pt.count,dt=Yt(Ot.start,S.width,4),Wt=Yt(pt.start,S.width,4);Ot.start<=bt+1&&dt===Wt&&Yt(Ot.start+Ot.count-1,S.width,4)===dt?pt.count=Math.max(pt.count,Ot.start+Ot.count-pt.start):(++wt,J[wt]=Ot)}J.length=wt+1;const ct=n.getParameter(n.UNPACK_ROW_LENGTH),Ct=n.getParameter(n.UNPACK_SKIP_PIXELS),xt=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,S.width);for(let ot=0,pt=J.length;ot<pt;ot++){const Ot=J[ot],bt=Math.floor(Ot.start/4),dt=Math.ceil(Ot.count/4),Wt=bt%S.width,I=Math.floor(bt/S.width),K=dt,j=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Wt),n.pixelStorei(n.UNPACK_SKIP_ROWS,I),e.texSubImage2D(n.TEXTURE_2D,0,Wt,I,K,j,W,Q,S.data)}D.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,ct),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ct),n.pixelStorei(n.UNPACK_SKIP_ROWS,xt)}}function $(D,S,W){let Q=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Q=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Q=n.TEXTURE_3D);const it=Gt(D,S),J=S.source;e.bindTexture(Q,D.__webglTexture,n.TEXTURE0+W);const wt=i.get(J);if(J.version!==wt.__version||it===!0){e.activeTexture(n.TEXTURE0+W);const ct=he.getPrimaries(he.workingColorSpace),Ct=S.colorSpace===ri?null:he.getPrimaries(S.colorSpace),xt=S.colorSpace===ri||ct===Ct?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);let ot=v(S.image,!1,r.maxTextureSize);ot=ye(S,ot);const pt=o.convert(S.format,S.colorSpace),Ot=o.convert(S.type);let bt=T(S.internalFormat,pt,Ot,S.colorSpace,S.isVideoTexture);Rt(Q,S);let dt;const Wt=S.mipmaps,I=S.isVideoTexture!==!0,K=wt.__version===void 0||it===!0,j=J.dataReady,at=L(S,ot);if(S.isDepthTexture)bt=y(S.format===Wr,S.type),K&&(I?e.texStorage2D(n.TEXTURE_2D,1,bt,ot.width,ot.height):e.texImage2D(n.TEXTURE_2D,0,bt,ot.width,ot.height,0,pt,Ot,null));else if(S.isDataTexture)if(Wt.length>0){I&&K&&e.texStorage2D(n.TEXTURE_2D,at,bt,Wt[0].width,Wt[0].height);for(let tt=0,Y=Wt.length;tt<Y;tt++)dt=Wt[tt],I?j&&e.texSubImage2D(n.TEXTURE_2D,tt,0,0,dt.width,dt.height,pt,Ot,dt.data):e.texImage2D(n.TEXTURE_2D,tt,bt,dt.width,dt.height,0,pt,Ot,dt.data);S.generateMipmaps=!1}else I?(K&&e.texStorage2D(n.TEXTURE_2D,at,bt,ot.width,ot.height),j&&Dt(S,ot,pt,Ot)):e.texImage2D(n.TEXTURE_2D,0,bt,ot.width,ot.height,0,pt,Ot,ot.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){I&&K&&e.texStorage3D(n.TEXTURE_2D_ARRAY,at,bt,Wt[0].width,Wt[0].height,ot.depth);for(let tt=0,Y=Wt.length;tt<Y;tt++)if(dt=Wt[tt],S.format!==Sn)if(pt!==null)if(I){if(j)if(S.layerUpdates.size>0){const ft=ql(dt.width,dt.height,S.format,S.type);for(const Pt of S.layerUpdates){const se=dt.data.subarray(Pt*ft/dt.data.BYTES_PER_ELEMENT,(Pt+1)*ft/dt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,tt,0,0,Pt,dt.width,dt.height,1,pt,se)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,tt,0,0,0,dt.width,dt.height,ot.depth,pt,dt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,tt,bt,dt.width,dt.height,ot.depth,0,dt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?j&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,tt,0,0,0,dt.width,dt.height,ot.depth,pt,Ot,dt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,tt,bt,dt.width,dt.height,ot.depth,0,pt,Ot,dt.data)}else{I&&K&&e.texStorage2D(n.TEXTURE_2D,at,bt,Wt[0].width,Wt[0].height);for(let tt=0,Y=Wt.length;tt<Y;tt++)dt=Wt[tt],S.format!==Sn?pt!==null?I?j&&e.compressedTexSubImage2D(n.TEXTURE_2D,tt,0,0,dt.width,dt.height,pt,dt.data):e.compressedTexImage2D(n.TEXTURE_2D,tt,bt,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?j&&e.texSubImage2D(n.TEXTURE_2D,tt,0,0,dt.width,dt.height,pt,Ot,dt.data):e.texImage2D(n.TEXTURE_2D,tt,bt,dt.width,dt.height,0,pt,Ot,dt.data)}else if(S.isDataArrayTexture)if(I){if(K&&e.texStorage3D(n.TEXTURE_2D_ARRAY,at,bt,ot.width,ot.height,ot.depth),j)if(S.layerUpdates.size>0){const tt=ql(ot.width,ot.height,S.format,S.type);for(const Y of S.layerUpdates){const ft=ot.data.subarray(Y*tt/ot.data.BYTES_PER_ELEMENT,(Y+1)*tt/ot.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Y,ot.width,ot.height,1,pt,Ot,ft)}S.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ot.width,ot.height,ot.depth,pt,Ot,ot.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,bt,ot.width,ot.height,ot.depth,0,pt,Ot,ot.data);else if(S.isData3DTexture)I?(K&&e.texStorage3D(n.TEXTURE_3D,at,bt,ot.width,ot.height,ot.depth),j&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ot.width,ot.height,ot.depth,pt,Ot,ot.data)):e.texImage3D(n.TEXTURE_3D,0,bt,ot.width,ot.height,ot.depth,0,pt,Ot,ot.data);else if(S.isFramebufferTexture){if(K)if(I)e.texStorage2D(n.TEXTURE_2D,at,bt,ot.width,ot.height);else{let tt=ot.width,Y=ot.height;for(let ft=0;ft<at;ft++)e.texImage2D(n.TEXTURE_2D,ft,bt,tt,Y,0,pt,Ot,null),tt>>=1,Y>>=1}}else if(Wt.length>0){if(I&&K){const tt=qt(Wt[0]);e.texStorage2D(n.TEXTURE_2D,at,bt,tt.width,tt.height)}for(let tt=0,Y=Wt.length;tt<Y;tt++)dt=Wt[tt],I?j&&e.texSubImage2D(n.TEXTURE_2D,tt,0,0,pt,Ot,dt):e.texImage2D(n.TEXTURE_2D,tt,bt,pt,Ot,dt);S.generateMipmaps=!1}else if(I){if(K){const tt=qt(ot);e.texStorage2D(n.TEXTURE_2D,at,bt,tt.width,tt.height)}j&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,pt,Ot,ot)}else e.texImage2D(n.TEXTURE_2D,0,bt,pt,Ot,ot);g(S)&&p(Q),wt.__version=J.version,S.onUpdate&&S.onUpdate(S)}D.__version=S.version}function nt(D,S,W){if(S.image.length!==6)return;const Q=Gt(D,S),it=S.source;e.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture,n.TEXTURE0+W);const J=i.get(it);if(it.version!==J.__version||Q===!0){e.activeTexture(n.TEXTURE0+W);const wt=he.getPrimaries(he.workingColorSpace),ct=S.colorSpace===ri?null:he.getPrimaries(S.colorSpace),Ct=S.colorSpace===ri||wt===ct?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct);const xt=S.isCompressedTexture||S.image[0].isCompressedTexture,ot=S.image[0]&&S.image[0].isDataTexture,pt=[];for(let Y=0;Y<6;Y++)!xt&&!ot?pt[Y]=v(S.image[Y],!0,r.maxCubemapSize):pt[Y]=ot?S.image[Y].image:S.image[Y],pt[Y]=ye(S,pt[Y]);const Ot=pt[0],bt=o.convert(S.format,S.colorSpace),dt=o.convert(S.type),Wt=T(S.internalFormat,bt,dt,S.colorSpace),I=S.isVideoTexture!==!0,K=J.__version===void 0||Q===!0,j=it.dataReady;let at=L(S,Ot);Rt(n.TEXTURE_CUBE_MAP,S);let tt;if(xt){I&&K&&e.texStorage2D(n.TEXTURE_CUBE_MAP,at,Wt,Ot.width,Ot.height);for(let Y=0;Y<6;Y++){tt=pt[Y].mipmaps;for(let ft=0;ft<tt.length;ft++){const Pt=tt[ft];S.format!==Sn?bt!==null?I?j&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ft,0,0,Pt.width,Pt.height,bt,Pt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ft,Wt,Pt.width,Pt.height,0,Pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?j&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ft,0,0,Pt.width,Pt.height,bt,dt,Pt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ft,Wt,Pt.width,Pt.height,0,bt,dt,Pt.data)}}}else{if(tt=S.mipmaps,I&&K){tt.length>0&&at++;const Y=qt(pt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,at,Wt,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(ot){I?j&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,pt[Y].width,pt[Y].height,bt,dt,pt[Y].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Wt,pt[Y].width,pt[Y].height,0,bt,dt,pt[Y].data);for(let ft=0;ft<tt.length;ft++){const se=tt[ft].image[Y].image;I?j&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ft+1,0,0,se.width,se.height,bt,dt,se.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ft+1,Wt,se.width,se.height,0,bt,dt,se.data)}}else{I?j&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,bt,dt,pt[Y]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Wt,bt,dt,pt[Y]);for(let ft=0;ft<tt.length;ft++){const Pt=tt[ft];I?j&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ft+1,0,0,bt,dt,Pt.image[Y]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ft+1,Wt,bt,dt,Pt.image[Y])}}}g(S)&&p(n.TEXTURE_CUBE_MAP),J.__version=it.version,S.onUpdate&&S.onUpdate(S)}D.__version=S.version}function ut(D,S,W,Q,it,J){const wt=o.convert(W.format,W.colorSpace),ct=o.convert(W.type),Ct=T(W.internalFormat,wt,ct,W.colorSpace),xt=i.get(S),ot=i.get(W);if(ot.__renderTarget=S,!xt.__hasExternalTextures){const pt=Math.max(1,S.width>>J),Ot=Math.max(1,S.height>>J);it===n.TEXTURE_3D||it===n.TEXTURE_2D_ARRAY?e.texImage3D(it,J,Ct,pt,Ot,S.depth,0,wt,ct,null):e.texImage2D(it,J,Ct,pt,Ot,0,wt,ct,null)}e.bindFramebuffer(n.FRAMEBUFFER,D),yt(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Q,it,ot.__webglTexture,0,de(S)):(it===n.TEXTURE_2D||it>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Q,it,ot.__webglTexture,J),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Tt(D,S,W){if(n.bindRenderbuffer(n.RENDERBUFFER,D),S.depthBuffer){const Q=S.depthTexture,it=Q&&Q.isDepthTexture?Q.type:null,J=y(S.stencilBuffer,it),wt=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ct=de(S);yt(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ct,J,S.width,S.height):W?n.renderbufferStorageMultisample(n.RENDERBUFFER,ct,J,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,J,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,wt,n.RENDERBUFFER,D)}else{const Q=S.textures;for(let it=0;it<Q.length;it++){const J=Q[it],wt=o.convert(J.format,J.colorSpace),ct=o.convert(J.type),Ct=T(J.internalFormat,wt,ct,J.colorSpace),xt=de(S);W&&yt(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,xt,Ct,S.width,S.height):yt(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,xt,Ct,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,Ct,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function _t(D,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,D),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=i.get(S.depthTexture);Q.__renderTarget=S,(!Q.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),H(S.depthTexture,0);const it=Q.__webglTexture,J=de(S);if(S.depthTexture.format===Gr)yt(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,it,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,it,0);else if(S.depthTexture.format===Wr)yt(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,it,0,J):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,it,0);else throw new Error("Unknown depthTexture format")}function jt(D){const S=i.get(D),W=D.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==D.depthTexture){const Q=D.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),Q){const it=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,Q.removeEventListener("dispose",it)};Q.addEventListener("dispose",it),S.__depthDisposeCallback=it}S.__boundDepthTexture=Q}if(D.depthTexture&&!S.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");const Q=D.texture.mipmaps;Q&&Q.length>0?_t(S.__webglFramebuffer[0],D):_t(S.__webglFramebuffer,D)}else if(W){S.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(e.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[Q]),S.__webglDepthbuffer[Q]===void 0)S.__webglDepthbuffer[Q]=n.createRenderbuffer(),Tt(S.__webglDepthbuffer[Q],D,!1);else{const it=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=S.__webglDepthbuffer[Q];n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,it,n.RENDERBUFFER,J)}}else{const Q=D.texture.mipmaps;if(Q&&Q.length>0?e.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=n.createRenderbuffer(),Tt(S.__webglDepthbuffer,D,!1);else{const it=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=S.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,it,n.RENDERBUFFER,J)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function ae(D,S,W){const Q=i.get(D);S!==void 0&&ut(Q.__webglFramebuffer,D,D.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),W!==void 0&&jt(D)}function F(D){const S=D.texture,W=i.get(D),Q=i.get(S);D.addEventListener("dispose",C);const it=D.textures,J=D.isWebGLCubeRenderTarget===!0,wt=it.length>1;if(wt||(Q.__webglTexture===void 0&&(Q.__webglTexture=n.createTexture()),Q.__version=S.version,s.memory.textures++),J){W.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(S.mipmaps&&S.mipmaps.length>0){W.__webglFramebuffer[ct]=[];for(let Ct=0;Ct<S.mipmaps.length;Ct++)W.__webglFramebuffer[ct][Ct]=n.createFramebuffer()}else W.__webglFramebuffer[ct]=n.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){W.__webglFramebuffer=[];for(let ct=0;ct<S.mipmaps.length;ct++)W.__webglFramebuffer[ct]=n.createFramebuffer()}else W.__webglFramebuffer=n.createFramebuffer();if(wt)for(let ct=0,Ct=it.length;ct<Ct;ct++){const xt=i.get(it[ct]);xt.__webglTexture===void 0&&(xt.__webglTexture=n.createTexture(),s.memory.textures++)}if(D.samples>0&&yt(D)===!1){W.__webglMultisampledFramebuffer=n.createFramebuffer(),W.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let ct=0;ct<it.length;ct++){const Ct=it[ct];W.__webglColorRenderbuffer[ct]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,W.__webglColorRenderbuffer[ct]);const xt=o.convert(Ct.format,Ct.colorSpace),ot=o.convert(Ct.type),pt=T(Ct.internalFormat,xt,ot,Ct.colorSpace,D.isXRRenderTarget===!0),Ot=de(D);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ot,pt,D.width,D.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ct,n.RENDERBUFFER,W.__webglColorRenderbuffer[ct])}n.bindRenderbuffer(n.RENDERBUFFER,null),D.depthBuffer&&(W.__webglDepthRenderbuffer=n.createRenderbuffer(),Tt(W.__webglDepthRenderbuffer,D,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(J){e.bindTexture(n.TEXTURE_CUBE_MAP,Q.__webglTexture),Rt(n.TEXTURE_CUBE_MAP,S);for(let ct=0;ct<6;ct++)if(S.mipmaps&&S.mipmaps.length>0)for(let Ct=0;Ct<S.mipmaps.length;Ct++)ut(W.__webglFramebuffer[ct][Ct],D,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Ct);else ut(W.__webglFramebuffer[ct],D,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);g(S)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(wt){for(let ct=0,Ct=it.length;ct<Ct;ct++){const xt=it[ct],ot=i.get(xt);let pt=n.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(pt=D.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(pt,ot.__webglTexture),Rt(pt,xt),ut(W.__webglFramebuffer,D,xt,n.COLOR_ATTACHMENT0+ct,pt,0),g(xt)&&p(pt)}e.unbindTexture()}else{let ct=n.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(ct=D.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ct,Q.__webglTexture),Rt(ct,S),S.mipmaps&&S.mipmaps.length>0)for(let Ct=0;Ct<S.mipmaps.length;Ct++)ut(W.__webglFramebuffer[Ct],D,S,n.COLOR_ATTACHMENT0,ct,Ct);else ut(W.__webglFramebuffer,D,S,n.COLOR_ATTACHMENT0,ct,0);g(S)&&p(ct),e.unbindTexture()}D.depthBuffer&&jt(D)}function pe(D){const S=D.textures;for(let W=0,Q=S.length;W<Q;W++){const it=S[W];if(g(it)){const J=A(D),wt=i.get(it).__webglTexture;e.bindTexture(J,wt),p(J),e.unbindTexture()}}}const Ut=[],Nt=[];function Et(D){if(D.samples>0){if(yt(D)===!1){const S=D.textures,W=D.width,Q=D.height;let it=n.COLOR_BUFFER_BIT;const J=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,wt=i.get(D),ct=S.length>1;if(ct)for(let xt=0;xt<S.length;xt++)e.bindFramebuffer(n.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,wt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,wt.__webglMultisampledFramebuffer);const Ct=D.texture.mipmaps;Ct&&Ct.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,wt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,wt.__webglFramebuffer);for(let xt=0;xt<S.length;xt++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(it|=n.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(it|=n.STENCIL_BUFFER_BIT)),ct){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,wt.__webglColorRenderbuffer[xt]);const ot=i.get(S[xt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ot,0)}n.blitFramebuffer(0,0,W,Q,0,0,W,Q,it,n.NEAREST),l===!0&&(Ut.length=0,Nt.length=0,Ut.push(n.COLOR_ATTACHMENT0+xt),D.depthBuffer&&D.resolveDepthBuffer===!1&&(Ut.push(J),Nt.push(J),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Nt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ut))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ct)for(let xt=0;xt<S.length;xt++){e.bindFramebuffer(n.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.RENDERBUFFER,wt.__webglColorRenderbuffer[xt]);const ot=i.get(S[xt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,wt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.TEXTURE_2D,ot,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,wt.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&l){const S=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[S])}}}function de(D){return Math.min(r.maxSamples,D.samples)}function yt(D){const S=i.get(D);return D.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Vt(D){const S=s.render.frame;d.get(D)!==S&&(d.set(D,S),D.update())}function ye(D,S){const W=D.colorSpace,Q=D.format,it=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||W!==ur&&W!==ri&&(he.getTransfer(W)===me?(Q!==Sn||it!==Dn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),S}function qt(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=N,this.setTexture2D=H,this.setTexture2DArray=G,this.setTexture3D=Z,this.setTextureCube=V,this.rebindTextures=ae,this.setupRenderTarget=F,this.updateRenderTargetMipmap=pe,this.updateMultisampleRenderTarget=Et,this.setupDepthRenderbuffer=jt,this.setupFrameBufferTexture=ut,this.useMultisampledRTT=yt}function Jg(n,t){function e(i,r=ri){let o;const s=he.getTransfer(r);if(i===Dn)return n.UNSIGNED_BYTE;if(i===Ja)return n.UNSIGNED_SHORT_4_4_4_4;if(i===$a)return n.UNSIGNED_SHORT_5_5_5_1;if(i===eh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===nh)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Qc)return n.BYTE;if(i===th)return n.SHORT;if(i===Hr)return n.UNSIGNED_SHORT;if(i===Ka)return n.INT;if(i===Li)return n.UNSIGNED_INT;if(i===Vn)return n.FLOAT;if(i===Qr)return n.HALF_FLOAT;if(i===ih)return n.ALPHA;if(i===rh)return n.RGB;if(i===Sn)return n.RGBA;if(i===Gr)return n.DEPTH_COMPONENT;if(i===Wr)return n.DEPTH_STENCIL;if(i===oh)return n.RED;if(i===ja)return n.RED_INTEGER;if(i===sh)return n.RG;if(i===Qa)return n.RG_INTEGER;if(i===tl)return n.RGBA_INTEGER;if(i===Bo||i===zo||i===ko||i===Ho)if(s===me)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(i===Bo)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===zo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ko)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ho)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(i===Bo)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===zo)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ko)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ho)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ha||i===ua||i===da||i===fa)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(i===ha)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ua)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===da)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===fa)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===pa||i===ma||i===ga)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(i===pa||i===ma)return s===me?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(i===ga)return s===me?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===_a||i===xa||i===va||i===Ma||i===ya||i===Sa||i===Ta||i===Ea||i===ba||i===wa||i===Aa||i===Ra||i===Ca||i===Pa)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(i===_a)return s===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===xa)return s===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===va)return s===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ma)return s===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ya)return s===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Sa)return s===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ta)return s===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ea)return s===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ba)return s===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===wa)return s===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Aa)return s===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ra)return s===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ca)return s===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Pa)return s===me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===La||i===Da||i===Ia)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(i===La)return s===me?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Da)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ia)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ua||i===Na||i===Fa||i===Oa)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(i===Ua)return o.COMPRESSED_RED_RGTC1_EXT;if(i===Na)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Fa)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Oa)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Vr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const $g=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,jg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Qg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new Th(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new ui({vertexShader:$g,fragmentShader:jg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ae(new Wn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class t_ extends mr{constructor(t,e){super();const i=this;let r=null,o=1,s=null,a="local-floor",l=1,c=null,d=null,h=null,f=null,m=null,x=null;const v=typeof XRWebGLBinding<"u",g=new Qg,p={},A=e.getContextAttributes();let T=null,y=null;const L=[],b=[],C=new vt;let U=null;const M=new nn;M.viewport=new Ee;const _=new nn;_.viewport=new Ee;const u=[M,_],N=new yf;let O=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let nt=L[$];return nt===void 0&&(nt=new Ps,L[$]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function($){let nt=L[$];return nt===void 0&&(nt=new Ps,L[$]=nt),nt.getGripSpace()},this.getHand=function($){let nt=L[$];return nt===void 0&&(nt=new Ps,L[$]=nt),nt.getHandSpace()};function H($){const nt=b.indexOf($.inputSource);if(nt===-1)return;const ut=L[nt];ut!==void 0&&(ut.update($.inputSource,$.frame,c||s),ut.dispatchEvent({type:$.type,data:$.inputSource}))}function G(){r.removeEventListener("select",H),r.removeEventListener("selectstart",H),r.removeEventListener("selectend",H),r.removeEventListener("squeeze",H),r.removeEventListener("squeezestart",H),r.removeEventListener("squeezeend",H),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",Z);for(let $=0;$<L.length;$++){const nt=b[$];nt!==null&&(b[$]=null,L[$].disconnect(nt))}O=null,k=null,g.reset();for(const $ in p)delete p[$];t.setRenderTarget(T),m=null,f=null,h=null,r=null,y=null,Dt.stop(),i.isPresenting=!1,t.setPixelRatio(U),t.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){o=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return h===null&&v&&(h=new XRWebGLBinding(r,e)),h},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function($){if(r=$,r!==null){if(T=t.getRenderTarget(),r.addEventListener("select",H),r.addEventListener("selectstart",H),r.addEventListener("selectend",H),r.addEventListener("squeeze",H),r.addEventListener("squeezestart",H),r.addEventListener("squeezeend",H),r.addEventListener("end",G),r.addEventListener("inputsourceschange",Z),A.xrCompatible!==!0&&await e.makeXRCompatible(),U=t.getPixelRatio(),t.getSize(C),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ut=null,Tt=null,_t=null;A.depth&&(_t=A.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ut=A.stencil?Wr:Gr,Tt=A.stencil?Vr:Li);const jt={colorFormat:e.RGBA8,depthFormat:_t,scaleFactor:o};h=this.getBinding(),f=h.createProjectionLayer(jt),r.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),y=new Di(f.textureWidth,f.textureHeight,{format:Sn,type:Dn,depthTexture:new Sh(f.textureWidth,f.textureHeight,Tt,void 0,void 0,void 0,void 0,void 0,void 0,ut),stencilBuffer:A.stencil,colorSpace:t.outputColorSpace,samples:A.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ut={antialias:A.antialias,alpha:!0,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:o};m=new XRWebGLLayer(r,e,ut),r.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),y=new Di(m.framebufferWidth,m.framebufferHeight,{format:Sn,type:Dn,colorSpace:t.outputColorSpace,stencilBuffer:A.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,s=await r.requestReferenceSpace(a),Dt.setContext(r),Dt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function Z($){for(let nt=0;nt<$.removed.length;nt++){const ut=$.removed[nt],Tt=b.indexOf(ut);Tt>=0&&(b[Tt]=null,L[Tt].disconnect(ut))}for(let nt=0;nt<$.added.length;nt++){const ut=$.added[nt];let Tt=b.indexOf(ut);if(Tt===-1){for(let jt=0;jt<L.length;jt++)if(jt>=b.length){b.push(ut),Tt=jt;break}else if(b[jt]===null){b[jt]=ut,Tt=jt;break}if(Tt===-1)break}const _t=L[Tt];_t&&_t.connect(ut)}}const V=new E,et=new E;function rt($,nt,ut){V.setFromMatrixPosition(nt.matrixWorld),et.setFromMatrixPosition(ut.matrixWorld);const Tt=V.distanceTo(et),_t=nt.projectionMatrix.elements,jt=ut.projectionMatrix.elements,ae=_t[14]/(_t[10]-1),F=_t[14]/(_t[10]+1),pe=(_t[9]+1)/_t[5],Ut=(_t[9]-1)/_t[5],Nt=(_t[8]-1)/_t[0],Et=(jt[8]+1)/jt[0],de=ae*Nt,yt=ae*Et,Vt=Tt/(-Nt+Et),ye=Vt*-Nt;if(nt.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(ye),$.translateZ(Vt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),_t[10]===-1)$.projectionMatrix.copy(nt.projectionMatrix),$.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const qt=ae+Vt,D=F+Vt,S=de-ye,W=yt+(Tt-ye),Q=pe*F/D*qt,it=Ut*F/D*qt;$.projectionMatrix.makePerspective(S,W,Q,it,qt,D),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function ht($,nt){nt===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(nt.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;let nt=$.near,ut=$.far;g.texture!==null&&(g.depthNear>0&&(nt=g.depthNear),g.depthFar>0&&(ut=g.depthFar)),N.near=_.near=M.near=nt,N.far=_.far=M.far=ut,(O!==N.near||k!==N.far)&&(r.updateRenderState({depthNear:N.near,depthFar:N.far}),O=N.near,k=N.far),N.layers.mask=$.layers.mask|6,M.layers.mask=N.layers.mask&3,_.layers.mask=N.layers.mask&5;const Tt=$.parent,_t=N.cameras;ht(N,Tt);for(let jt=0;jt<_t.length;jt++)ht(_t[jt],Tt);_t.length===2?rt(N,M,_):N.projectionMatrix.copy(M.projectionMatrix),Rt($,N,Tt)};function Rt($,nt,ut){ut===null?$.matrix.copy(nt.matrixWorld):($.matrix.copy(ut.matrixWorld),$.matrix.invert(),$.matrix.multiply(nt.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(nt.projectionMatrix),$.projectionMatrixInverse.copy(nt.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Xr*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(f===null&&m===null))return l},this.setFoveation=function($){l=$,f!==null&&(f.fixedFoveation=$),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=$)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(N)},this.getCameraTexture=function($){return p[$]};let Gt=null;function Yt($,nt){if(d=nt.getViewerPose(c||s),x=nt,d!==null){const ut=d.views;m!==null&&(t.setRenderTargetFramebuffer(y,m.framebuffer),t.setRenderTarget(y));let Tt=!1;ut.length!==N.cameras.length&&(N.cameras.length=0,Tt=!0);for(let F=0;F<ut.length;F++){const pe=ut[F];let Ut=null;if(m!==null)Ut=m.getViewport(pe);else{const Et=h.getViewSubImage(f,pe);Ut=Et.viewport,F===0&&(t.setRenderTargetTextures(y,Et.colorTexture,Et.depthStencilTexture),t.setRenderTarget(y))}let Nt=u[F];Nt===void 0&&(Nt=new nn,Nt.layers.enable(F),Nt.viewport=new Ee,u[F]=Nt),Nt.matrix.fromArray(pe.transform.matrix),Nt.matrix.decompose(Nt.position,Nt.quaternion,Nt.scale),Nt.projectionMatrix.fromArray(pe.projectionMatrix),Nt.projectionMatrixInverse.copy(Nt.projectionMatrix).invert(),Nt.viewport.set(Ut.x,Ut.y,Ut.width,Ut.height),F===0&&(N.matrix.copy(Nt.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Tt===!0&&N.cameras.push(Nt)}const _t=r.enabledFeatures;if(_t&&_t.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){h=i.getBinding();const F=h.getDepthInformation(ut[0]);F&&F.isValid&&F.texture&&g.init(F,r.renderState)}if(_t&&_t.includes("camera-access")&&v){t.state.unbindTexture(),h=i.getBinding();for(let F=0;F<ut.length;F++){const pe=ut[F].camera;if(pe){let Ut=p[pe];Ut||(Ut=new Th,p[pe]=Ut);const Nt=h.getCameraImage(pe);Ut.sourceTexture=Nt}}}}for(let ut=0;ut<L.length;ut++){const Tt=b[ut],_t=L[ut];Tt!==null&&_t!==void 0&&_t.update(Tt,nt,c||s)}Gt&&Gt($,nt),nt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:nt}),x=null}const Dt=new Nh;Dt.setAnimationLoop(Yt),this.setAnimationLoop=function($){Gt=$},this.dispose=function(){}}}const yi=new Re,e_=new Me;function n_(n,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,gh(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function r(g,p,A,T,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?o(g,p):p.isMeshToonMaterial?(o(g,p),h(g,p)):p.isMeshPhongMaterial?(o(g,p),d(g,p)):p.isMeshStandardMaterial?(o(g,p),f(g,p),p.isMeshPhysicalMaterial&&m(g,p,y)):p.isMeshMatcapMaterial?(o(g,p),x(g,p)):p.isMeshDepthMaterial?o(g,p):p.isMeshDistanceMaterial?(o(g,p),v(g,p)):p.isMeshNormalMaterial?o(g,p):p.isLineBasicMaterial?(s(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,A,T):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function o(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Qe&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Qe&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const A=t.get(p),T=A.envMap,y=A.envMapRotation;T&&(g.envMap.value=T,yi.copy(y),yi.x*=-1,yi.y*=-1,yi.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(yi.y*=-1,yi.z*=-1),g.envMapRotation.value.setFromMatrix4(e_.makeRotationFromEuler(yi)),g.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function s(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,A,T){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*A,g.scale.value=T*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function d(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function h(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function m(g,p,A){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Qe&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=A.texture,g.transmissionSamplerSize.value.set(A.width,A.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function x(g,p){p.matcap&&(g.matcap.value=p.matcap)}function v(g,p){const A=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(A.matrixWorld),g.nearDistance.value=A.shadow.camera.near,g.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function i_(n,t,e,i){let r={},o={},s=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(A,T){const y=T.program;i.uniformBlockBinding(A,y)}function c(A,T){let y=r[A.id];y===void 0&&(x(A),y=d(A),r[A.id]=y,A.addEventListener("dispose",g));const L=T.program;i.updateUBOMapping(A,L);const b=t.render.frame;o[A.id]!==b&&(f(A),o[A.id]=b)}function d(A){const T=h();A.__bindingPointIndex=T;const y=n.createBuffer(),L=A.__size,b=A.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,L,b),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,y),y}function h(){for(let A=0;A<a;A++)if(s.indexOf(A)===-1)return s.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(A){const T=r[A.id],y=A.uniforms,L=A.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let b=0,C=y.length;b<C;b++){const U=Array.isArray(y[b])?y[b]:[y[b]];for(let M=0,_=U.length;M<_;M++){const u=U[M];if(m(u,b,M,L)===!0){const N=u.__offset,O=Array.isArray(u.value)?u.value:[u.value];let k=0;for(let H=0;H<O.length;H++){const G=O[H],Z=v(G);typeof G=="number"||typeof G=="boolean"?(u.__data[0]=G,n.bufferSubData(n.UNIFORM_BUFFER,N+k,u.__data)):G.isMatrix3?(u.__data[0]=G.elements[0],u.__data[1]=G.elements[1],u.__data[2]=G.elements[2],u.__data[3]=0,u.__data[4]=G.elements[3],u.__data[5]=G.elements[4],u.__data[6]=G.elements[5],u.__data[7]=0,u.__data[8]=G.elements[6],u.__data[9]=G.elements[7],u.__data[10]=G.elements[8],u.__data[11]=0):(G.toArray(u.__data,k),k+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,N,u.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(A,T,y,L){const b=A.value,C=T+"_"+y;if(L[C]===void 0)return typeof b=="number"||typeof b=="boolean"?L[C]=b:L[C]=b.clone(),!0;{const U=L[C];if(typeof b=="number"||typeof b=="boolean"){if(U!==b)return L[C]=b,!0}else if(U.equals(b)===!1)return U.copy(b),!0}return!1}function x(A){const T=A.uniforms;let y=0;const L=16;for(let C=0,U=T.length;C<U;C++){const M=Array.isArray(T[C])?T[C]:[T[C]];for(let _=0,u=M.length;_<u;_++){const N=M[_],O=Array.isArray(N.value)?N.value:[N.value];for(let k=0,H=O.length;k<H;k++){const G=O[k],Z=v(G),V=y%L,et=V%Z.boundary,rt=V+et;y+=et,rt!==0&&L-rt<Z.storage&&(y+=L-rt),N.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=y,y+=Z.storage}}}const b=y%L;return b>0&&(y+=L-b),A.__size=y,A.__cache={},this}function v(A){const T={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(T.boundary=4,T.storage=4):A.isVector2?(T.boundary=8,T.storage=8):A.isVector3||A.isColor?(T.boundary=16,T.storage=12):A.isVector4?(T.boundary=16,T.storage=16):A.isMatrix3?(T.boundary=48,T.storage=48):A.isMatrix4?(T.boundary=64,T.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),T}function g(A){const T=A.target;T.removeEventListener("dispose",g);const y=s.indexOf(T.__bindingPointIndex);s.splice(y,1),n.deleteBuffer(r[T.id]),delete r[T.id],delete o[T.id]}function p(){for(const A in r)n.deleteBuffer(r[A]);s=[],r={},o={}}return{bind:l,update:c,dispose:p}}class r_{constructor(t={}){const{canvas:e=rd(),context:i=null,depth:r=!0,stencil:o=!1,alpha:s=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=s;const x=new Uint32Array(4),v=new Int32Array(4);let g=null,p=null;const A=[],T=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=li,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let L=!1;this._outputColorSpace=hn;let b=0,C=0,U=null,M=-1,_=null;const u=new Ee,N=new Ee;let O=null;const k=new ne(0);let H=0,G=e.width,Z=e.height,V=1,et=null,rt=null;const ht=new Ee(0,0,G,Z),Rt=new Ee(0,0,G,Z);let Gt=!1;const Yt=new ol;let Dt=!1,$=!1;const nt=new Me,ut=new E,Tt=new Ee,_t={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let jt=!1;function ae(){return U===null?V:1}let F=i;function pe(R,B){return e.getContext(R,B)}try{const R={alpha:!0,depth:r,stencil:o,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${qa}`),e.addEventListener("webglcontextlost",j,!1),e.addEventListener("webglcontextrestored",at,!1),e.addEventListener("webglcontextcreationerror",tt,!1),F===null){const B="webgl2";if(F=pe(B,R),F===null)throw pe(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let Ut,Nt,Et,de,yt,Vt,ye,qt,D,S,W,Q,it,J,wt,ct,Ct,xt,ot,pt,Ot,bt,dt,Wt;function I(){Ut=new p0(F),Ut.init(),bt=new Jg(F,Ut),Nt=new a0(F,Ut,t,bt),Et=new qg(F,Ut),Nt.reversedDepthBuffer&&f&&Et.buffers.depth.setReversed(!0),de=new _0(F),yt=new Ng,Vt=new Kg(F,Ut,Et,yt,Nt,bt,de),ye=new c0(y),qt=new f0(y),D=new Tf(F),dt=new o0(F,D),S=new m0(F,D,de,dt),W=new v0(F,S,D,de),ot=new x0(F,Nt,Vt),ct=new l0(yt),Q=new Ug(y,ye,qt,Ut,Nt,dt,ct),it=new n_(y,yt),J=new Og,wt=new Gg(Ut),xt=new r0(y,ye,qt,Et,W,m,l),Ct=new Zg(y,W,Nt),Wt=new i_(F,de,Nt,Et),pt=new s0(F,Ut,de),Ot=new g0(F,Ut,de),de.programs=Q.programs,y.capabilities=Nt,y.extensions=Ut,y.properties=yt,y.renderLists=J,y.shadowMap=Ct,y.state=Et,y.info=de}I();const K=new t_(y,F);this.xr=K,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const R=Ut.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=Ut.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(R){R!==void 0&&(V=R,this.setSize(G,Z,!1))},this.getSize=function(R){return R.set(G,Z)},this.setSize=function(R,B,X=!0){if(K.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=R,Z=B,e.width=Math.floor(R*V),e.height=Math.floor(B*V),X===!0&&(e.style.width=R+"px",e.style.height=B+"px"),this.setViewport(0,0,R,B)},this.getDrawingBufferSize=function(R){return R.set(G*V,Z*V).floor()},this.setDrawingBufferSize=function(R,B,X){G=R,Z=B,V=X,e.width=Math.floor(R*X),e.height=Math.floor(B*X),this.setViewport(0,0,R,B)},this.getCurrentViewport=function(R){return R.copy(u)},this.getViewport=function(R){return R.copy(ht)},this.setViewport=function(R,B,X,q){R.isVector4?ht.set(R.x,R.y,R.z,R.w):ht.set(R,B,X,q),Et.viewport(u.copy(ht).multiplyScalar(V).round())},this.getScissor=function(R){return R.copy(Rt)},this.setScissor=function(R,B,X,q){R.isVector4?Rt.set(R.x,R.y,R.z,R.w):Rt.set(R,B,X,q),Et.scissor(N.copy(Rt).multiplyScalar(V).round())},this.getScissorTest=function(){return Gt},this.setScissorTest=function(R){Et.setScissorTest(Gt=R)},this.setOpaqueSort=function(R){et=R},this.setTransparentSort=function(R){rt=R},this.getClearColor=function(R){return R.copy(xt.getClearColor())},this.setClearColor=function(){xt.setClearColor(...arguments)},this.getClearAlpha=function(){return xt.getClearAlpha()},this.setClearAlpha=function(){xt.setClearAlpha(...arguments)},this.clear=function(R=!0,B=!0,X=!0){let q=0;if(R){let z=!1;if(U!==null){const st=U.texture.format;z=st===tl||st===Qa||st===ja}if(z){const st=U.texture.type,lt=st===Dn||st===Li||st===Hr||st===Vr||st===Ja||st===$a,St=xt.getClearColor(),Mt=xt.getClearAlpha(),Ft=St.r,zt=St.g,It=St.b;lt?(x[0]=Ft,x[1]=zt,x[2]=It,x[3]=Mt,F.clearBufferuiv(F.COLOR,0,x)):(v[0]=Ft,v[1]=zt,v[2]=It,v[3]=Mt,F.clearBufferiv(F.COLOR,0,v))}else q|=F.COLOR_BUFFER_BIT}B&&(q|=F.DEPTH_BUFFER_BIT),X&&(q|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",j,!1),e.removeEventListener("webglcontextrestored",at,!1),e.removeEventListener("webglcontextcreationerror",tt,!1),xt.dispose(),J.dispose(),wt.dispose(),yt.dispose(),ye.dispose(),qt.dispose(),W.dispose(),dt.dispose(),Wt.dispose(),Q.dispose(),K.dispose(),K.removeEventListener("sessionstart",Be),K.removeEventListener("sessionend",Zn),rn.stop()};function j(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function at(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const R=de.autoReset,B=Ct.enabled,X=Ct.autoUpdate,q=Ct.needsUpdate,z=Ct.type;I(),de.autoReset=R,Ct.enabled=B,Ct.autoUpdate=X,Ct.needsUpdate=q,Ct.type=z}function tt(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Y(R){const B=R.target;B.removeEventListener("dispose",Y),ft(B)}function ft(R){Pt(R),yt.remove(R)}function Pt(R){const B=yt.get(R).programs;B!==void 0&&(B.forEach(function(X){Q.releaseProgram(X)}),R.isShaderMaterial&&Q.releaseShaderCache(R))}this.renderBufferDirect=function(R,B,X,q,z,st){B===null&&(B=_t);const lt=z.isMesh&&z.matrixWorld.determinant()<0,St=ro(R,B,X,q,z);Et.setMaterial(q,lt);let Mt=X.index,Ft=1;if(q.wireframe===!0){if(Mt=S.getWireframeAttribute(X),Mt===void 0)return;Ft=2}const zt=X.drawRange,It=X.attributes.position;let ie=zt.start*Ft,ue=(zt.start+zt.count)*Ft;st!==null&&(ie=Math.max(ie,st.start*Ft),ue=Math.min(ue,(st.start+st.count)*Ft)),Mt!==null?(ie=Math.max(ie,0),ue=Math.min(ue,Mt.count)):It!=null&&(ie=Math.max(ie,0),ue=Math.min(ue,It.count));const Lt=ue-ie;if(Lt<0||Lt===1/0)return;dt.setup(z,q,St,X,Mt);let kt,Jt=pt;if(Mt!==null&&(kt=D.get(Mt),Jt=Ot,Jt.setIndex(kt)),z.isMesh)q.wireframe===!0?(Et.setLineWidth(q.wireframeLinewidth*ae()),Jt.setMode(F.LINES)):Jt.setMode(F.TRIANGLES);else if(z.isLine){let At=q.linewidth;At===void 0&&(At=1),Et.setLineWidth(At*ae()),z.isLineSegments?Jt.setMode(F.LINES):z.isLineLoop?Jt.setMode(F.LINE_LOOP):Jt.setMode(F.LINE_STRIP)}else z.isPoints?Jt.setMode(F.POINTS):z.isSprite&&Jt.setMode(F.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)Zr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Jt.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(Ut.get("WEBGL_multi_draw"))Jt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const At=z._multiDrawStarts,oe=z._multiDrawCounts,$t=z._multiDrawCount,we=Mt?D.get(Mt).bytesPerElement:1,Ve=yt.get(q).currentProgram.getUniforms();for(let De=0;De<$t;De++)Ve.setValue(F,"_gl_DrawID",De),Jt.render(At[De]/we,oe[De])}else if(z.isInstancedMesh)Jt.renderInstances(ie,Lt,z.count);else if(X.isInstancedBufferGeometry){const At=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,oe=Math.min(X.instanceCount,At);Jt.renderInstances(ie,Lt,oe)}else Jt.render(ie,Lt)};function se(R,B,X){R.transparent===!0&&R.side===Mn&&R.forceSinglePass===!1?(R.side=Qe,R.needsUpdate=!0,on(R,B,X),R.side=hi,R.needsUpdate=!0,on(R,B,X),R.side=Mn):on(R,B,X)}this.compile=function(R,B,X=null){X===null&&(X=R),p=wt.get(X),p.init(B),T.push(p),X.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),R!==X&&R.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),p.setupLights();const q=new Set;return R.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const st=z.material;if(st)if(Array.isArray(st))for(let lt=0;lt<st.length;lt++){const St=st[lt];se(St,X,z),q.add(St)}else se(st,X,z),q.add(st)}),p=T.pop(),q},this.compileAsync=function(R,B,X=null){const q=this.compile(R,B,X);return new Promise(z=>{function st(){if(q.forEach(function(lt){yt.get(lt).currentProgram.isReady()&&q.delete(lt)}),q.size===0){z(R);return}setTimeout(st,10)}Ut.get("KHR_parallel_shader_compile")!==null?st():setTimeout(st,10)})};let Kt=null;function be(R){Kt&&Kt(R)}function Be(){rn.stop()}function Zn(){rn.start()}const rn=new Nh;rn.setAnimationLoop(be),typeof self<"u"&&rn.setContext(self),this.setAnimationLoop=function(R){Kt=R,K.setAnimationLoop(R),R===null?rn.stop():rn.start()},K.addEventListener("sessionstart",Be),K.addEventListener("sessionend",Zn),this.render=function(R,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),K.enabled===!0&&K.isPresenting===!0&&(K.cameraAutoUpdate===!0&&K.updateCamera(B),B=K.getCamera()),R.isScene===!0&&R.onBeforeRender(y,R,B,U),p=wt.get(R,T.length),p.init(B),T.push(p),nt.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Yt.setFromProjectionMatrix(nt,Pn,B.reversedDepth),$=this.localClippingEnabled,Dt=ct.init(this.clippingPlanes,$),g=J.get(R,A.length),g.init(),A.push(g),K.enabled===!0&&K.isPresenting===!0){const st=y.xr.getDepthSensingMesh();st!==null&&Yn(st,B,-1/0,y.sortObjects)}Yn(R,B,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(et,rt),jt=K.enabled===!1||K.isPresenting===!1||K.hasDepthSensing()===!1,jt&&xt.addToRenderList(g,R),this.info.render.frame++,Dt===!0&&ct.beginShadows();const X=p.state.shadowsArray;Ct.render(X,R,B),Dt===!0&&ct.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=g.opaque,z=g.transmissive;if(p.setupLights(),B.isArrayCamera){const st=B.cameras;if(z.length>0)for(let lt=0,St=st.length;lt<St;lt++){const Mt=st[lt];io(q,z,R,Mt)}jt&&xt.render(R);for(let lt=0,St=st.length;lt<St;lt++){const Mt=st[lt];He(g,R,Mt,Mt.viewport)}}else z.length>0&&io(q,z,R,B),jt&&xt.render(R),He(g,R,B);U!==null&&C===0&&(Vt.updateMultisampleRenderTarget(U),Vt.updateRenderTargetMipmap(U)),R.isScene===!0&&R.onAfterRender(y,R,B),dt.resetDefaultState(),M=-1,_=null,T.pop(),T.length>0?(p=T[T.length-1],Dt===!0&&ct.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,A.pop(),A.length>0?g=A[A.length-1]:g=null};function Yn(R,B,X,q){if(R.visible===!1)return;if(R.layers.test(B.layers)){if(R.isGroup)X=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(B);else if(R.isLight)p.pushLight(R),R.castShadow&&p.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||Yt.intersectsSprite(R)){q&&Tt.setFromMatrixPosition(R.matrixWorld).applyMatrix4(nt);const lt=W.update(R),St=R.material;St.visible&&g.push(R,lt,St,X,Tt.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||Yt.intersectsObject(R))){const lt=W.update(R),St=R.material;if(q&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Tt.copy(R.boundingSphere.center)):(lt.boundingSphere===null&&lt.computeBoundingSphere(),Tt.copy(lt.boundingSphere.center)),Tt.applyMatrix4(R.matrixWorld).applyMatrix4(nt)),Array.isArray(St)){const Mt=lt.groups;for(let Ft=0,zt=Mt.length;Ft<zt;Ft++){const It=Mt[Ft],ie=St[It.materialIndex];ie&&ie.visible&&g.push(R,lt,ie,X,Tt.z,It)}}else St.visible&&g.push(R,lt,St,X,Tt.z,null)}}const st=R.children;for(let lt=0,St=st.length;lt<St;lt++)Yn(st[lt],B,X,q)}function He(R,B,X,q){const z=R.opaque,st=R.transmissive,lt=R.transparent;p.setupLightsView(X),Dt===!0&&ct.setGlobalState(y.clippingPlanes,X),q&&Et.viewport(u.copy(q)),z.length>0&&Ni(z,B,X),st.length>0&&Ni(st,B,X),lt.length>0&&Ni(lt,B,X),Et.buffers.depth.setTest(!0),Et.buffers.depth.setMask(!0),Et.buffers.color.setMask(!0),Et.setPolygonOffset(!1)}function io(R,B,X,q){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[q.id]===void 0&&(p.state.transmissionRenderTarget[q.id]=new Di(1,1,{generateMipmaps:!0,type:Ut.has("EXT_color_buffer_half_float")||Ut.has("EXT_color_buffer_float")?Qr:Dn,minFilter:Ci,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:he.workingColorSpace}));const st=p.state.transmissionRenderTarget[q.id],lt=q.viewport||u;st.setSize(lt.z*y.transmissionResolutionScale,lt.w*y.transmissionResolutionScale);const St=y.getRenderTarget(),Mt=y.getActiveCubeFace(),Ft=y.getActiveMipmapLevel();y.setRenderTarget(st),y.getClearColor(k),H=y.getClearAlpha(),H<1&&y.setClearColor(16777215,.5),y.clear(),jt&&xt.render(X);const zt=y.toneMapping;y.toneMapping=li;const It=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),p.setupLightsView(q),Dt===!0&&ct.setGlobalState(y.clippingPlanes,q),Ni(R,X,q),Vt.updateMultisampleRenderTarget(st),Vt.updateRenderTargetMipmap(st),Ut.has("WEBGL_multisampled_render_to_texture")===!1){let ie=!1;for(let ue=0,Lt=B.length;ue<Lt;ue++){const kt=B[ue],Jt=kt.object,At=kt.geometry,oe=kt.material,$t=kt.group;if(oe.side===Mn&&Jt.layers.test(q.layers)){const we=oe.side;oe.side=Qe,oe.needsUpdate=!0,Fi(Jt,X,q,At,oe,$t),oe.side=we,oe.needsUpdate=!0,ie=!0}}ie===!0&&(Vt.updateMultisampleRenderTarget(st),Vt.updateRenderTargetMipmap(st))}y.setRenderTarget(St,Mt,Ft),y.setClearColor(k,H),It!==void 0&&(q.viewport=It),y.toneMapping=zt}function Ni(R,B,X){const q=B.isScene===!0?B.overrideMaterial:null;for(let z=0,st=R.length;z<st;z++){const lt=R[z],St=lt.object,Mt=lt.geometry,Ft=lt.group;let zt=lt.material;zt.allowOverride===!0&&q!==null&&(zt=q),St.layers.test(X.layers)&&Fi(St,B,X,Mt,zt,Ft)}}function Fi(R,B,X,q,z,st){R.onBeforeRender(y,B,X,q,z,st),R.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),z.onBeforeRender(y,B,X,q,R,st),z.transparent===!0&&z.side===Mn&&z.forceSinglePass===!1?(z.side=Qe,z.needsUpdate=!0,y.renderBufferDirect(X,B,q,z,R,st),z.side=hi,z.needsUpdate=!0,y.renderBufferDirect(X,B,q,z,R,st),z.side=Mn):y.renderBufferDirect(X,B,q,z,R,st),R.onAfterRender(y,B,X,q,z,st)}function on(R,B,X){B.isScene!==!0&&(B=_t);const q=yt.get(R),z=p.state.lights,st=p.state.shadowsArray,lt=z.state.version,St=Q.getParameters(R,z.state,st,B,X),Mt=Q.getProgramCacheKey(St);let Ft=q.programs;q.environment=R.isMeshStandardMaterial?B.environment:null,q.fog=B.fog,q.envMap=(R.isMeshStandardMaterial?qt:ye).get(R.envMap||q.environment),q.envMapRotation=q.environment!==null&&R.envMap===null?B.environmentRotation:R.envMapRotation,Ft===void 0&&(R.addEventListener("dispose",Y),Ft=new Map,q.programs=Ft);let zt=Ft.get(Mt);if(zt!==void 0){if(q.currentProgram===zt&&q.lightsStateVersion===lt)return Oi(R,St),zt}else St.uniforms=Q.getUniforms(R),R.onBeforeCompile(St,y),zt=Q.acquireProgram(St,Mt),Ft.set(Mt,zt),q.uniforms=St.uniforms;const It=q.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(It.clippingPlanes=ct.uniform),Oi(R,St),q.needsLights=qe(R),q.lightsStateVersion=lt,q.needsLights&&(It.ambientLightColor.value=z.state.ambient,It.lightProbe.value=z.state.probe,It.directionalLights.value=z.state.directional,It.directionalLightShadows.value=z.state.directionalShadow,It.spotLights.value=z.state.spot,It.spotLightShadows.value=z.state.spotShadow,It.rectAreaLights.value=z.state.rectArea,It.ltc_1.value=z.state.rectAreaLTC1,It.ltc_2.value=z.state.rectAreaLTC2,It.pointLights.value=z.state.point,It.pointLightShadows.value=z.state.pointShadow,It.hemisphereLights.value=z.state.hemi,It.directionalShadowMap.value=z.state.directionalShadowMap,It.directionalShadowMatrix.value=z.state.directionalShadowMatrix,It.spotShadowMap.value=z.state.spotShadowMap,It.spotLightMatrix.value=z.state.spotLightMatrix,It.spotLightMap.value=z.state.spotLightMap,It.pointShadowMap.value=z.state.pointShadowMap,It.pointShadowMatrix.value=z.state.pointShadowMatrix),q.currentProgram=zt,q.uniformsList=null,zt}function xr(R){if(R.uniformsList===null){const B=R.currentProgram.getUniforms();R.uniformsList=Vo.seqWithValue(B.seq,R.uniforms)}return R.uniformsList}function Oi(R,B){const X=yt.get(R);X.outputColorSpace=B.outputColorSpace,X.batching=B.batching,X.batchingColor=B.batchingColor,X.instancing=B.instancing,X.instancingColor=B.instancingColor,X.instancingMorph=B.instancingMorph,X.skinning=B.skinning,X.morphTargets=B.morphTargets,X.morphNormals=B.morphNormals,X.morphColors=B.morphColors,X.morphTargetsCount=B.morphTargetsCount,X.numClippingPlanes=B.numClippingPlanes,X.numIntersection=B.numClipIntersection,X.vertexAlphas=B.vertexAlphas,X.vertexTangents=B.vertexTangents,X.toneMapping=B.toneMapping}function ro(R,B,X,q,z){B.isScene!==!0&&(B=_t),Vt.resetTextureUnits();const st=B.fog,lt=q.isMeshStandardMaterial?B.environment:null,St=U===null?y.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:ur,Mt=(q.isMeshStandardMaterial?qt:ye).get(q.envMap||lt),Ft=q.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,zt=!!X.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),It=!!X.morphAttributes.position,ie=!!X.morphAttributes.normal,ue=!!X.morphAttributes.color;let Lt=li;q.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(Lt=y.toneMapping);const kt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Jt=kt!==void 0?kt.length:0,At=yt.get(q),oe=p.state.lights;if(Dt===!0&&($===!0||R!==_)){const Ge=R===_&&q.id===M;ct.setState(q,R,Ge)}let $t=!1;q.version===At.__version?(At.needsLights&&At.lightsStateVersion!==oe.state.version||At.outputColorSpace!==St||z.isBatchedMesh&&At.batching===!1||!z.isBatchedMesh&&At.batching===!0||z.isBatchedMesh&&At.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&At.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&At.instancing===!1||!z.isInstancedMesh&&At.instancing===!0||z.isSkinnedMesh&&At.skinning===!1||!z.isSkinnedMesh&&At.skinning===!0||z.isInstancedMesh&&At.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&At.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&At.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&At.instancingMorph===!1&&z.morphTexture!==null||At.envMap!==Mt||q.fog===!0&&At.fog!==st||At.numClippingPlanes!==void 0&&(At.numClippingPlanes!==ct.numPlanes||At.numIntersection!==ct.numIntersection)||At.vertexAlphas!==Ft||At.vertexTangents!==zt||At.morphTargets!==It||At.morphNormals!==ie||At.morphColors!==ue||At.toneMapping!==Lt||At.morphTargetsCount!==Jt)&&($t=!0):($t=!0,At.__version=q.version);let we=At.currentProgram;$t===!0&&(we=on(q,B,z));let Ve=!1,De=!1,fn=!1;const _e=we.getUniforms(),sn=At.uniforms;if(Et.useProgram(we.program)&&(Ve=!0,De=!0,fn=!0),q.id!==M&&(M=q.id,De=!0),Ve||_!==R){Et.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),_e.setValue(F,"projectionMatrix",R.projectionMatrix),_e.setValue(F,"viewMatrix",R.matrixWorldInverse);const Ke=_e.map.cameraPosition;Ke!==void 0&&Ke.setValue(F,ut.setFromMatrixPosition(R.matrixWorld)),Nt.logarithmicDepthBuffer&&_e.setValue(F,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&_e.setValue(F,"isOrthographic",R.isOrthographicCamera===!0),_!==R&&(_=R,De=!0,fn=!0)}if(z.isSkinnedMesh){_e.setOptional(F,z,"bindMatrix"),_e.setOptional(F,z,"bindMatrixInverse");const Ge=z.skeleton;Ge&&(Ge.boneTexture===null&&Ge.computeBoneTexture(),_e.setValue(F,"boneTexture",Ge.boneTexture,Vt))}z.isBatchedMesh&&(_e.setOptional(F,z,"batchingTexture"),_e.setValue(F,"batchingTexture",z._matricesTexture,Vt),_e.setOptional(F,z,"batchingIdTexture"),_e.setValue(F,"batchingIdTexture",z._indirectTexture,Vt),_e.setOptional(F,z,"batchingColorTexture"),z._colorsTexture!==null&&_e.setValue(F,"batchingColorTexture",z._colorsTexture,Vt));const an=X.morphAttributes;if((an.position!==void 0||an.normal!==void 0||an.color!==void 0)&&ot.update(z,X,we),(De||At.receiveShadow!==z.receiveShadow)&&(At.receiveShadow=z.receiveShadow,_e.setValue(F,"receiveShadow",z.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(sn.envMap.value=Mt,sn.flipEnvMap.value=Mt.isCubeTexture&&Mt.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&B.environment!==null&&(sn.envMapIntensity.value=B.environmentIntensity),De&&(_e.setValue(F,"toneMappingExposure",y.toneMappingExposure),At.needsLights&&dl(sn,fn),st&&q.fog===!0&&it.refreshFogUniforms(sn,st),it.refreshMaterialUniforms(sn,q,V,Z,p.state.transmissionRenderTarget[R.id]),Vo.upload(F,xr(At),sn,Vt)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Vo.upload(F,xr(At),sn,Vt),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&_e.setValue(F,"center",z.center),_e.setValue(F,"modelViewMatrix",z.modelViewMatrix),_e.setValue(F,"normalMatrix",z.normalMatrix),_e.setValue(F,"modelMatrix",z.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const Ge=q.uniformsGroups;for(let Ke=0,ls=Ge.length;Ke<ls;Ke++){const mi=Ge[Ke];Wt.update(mi,we),Wt.bind(mi,we)}}return we}function dl(R,B){R.ambientLightColor.needsUpdate=B,R.lightProbe.needsUpdate=B,R.directionalLights.needsUpdate=B,R.directionalLightShadows.needsUpdate=B,R.pointLights.needsUpdate=B,R.pointLightShadows.needsUpdate=B,R.spotLights.needsUpdate=B,R.spotLightShadows.needsUpdate=B,R.rectAreaLights.needsUpdate=B,R.hemisphereLights.needsUpdate=B}function qe(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(R,B,X){const q=yt.get(R);q.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),yt.get(R.texture).__webglTexture=B,yt.get(R.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:X,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,B){const X=yt.get(R);X.__webglFramebuffer=B,X.__useDefaultFramebuffer=B===void 0};const pi=F.createFramebuffer();this.setRenderTarget=function(R,B=0,X=0){U=R,b=B,C=X;let q=!0,z=null,st=!1,lt=!1;if(R){const Mt=yt.get(R);if(Mt.__useDefaultFramebuffer!==void 0)Et.bindFramebuffer(F.FRAMEBUFFER,null),q=!1;else if(Mt.__webglFramebuffer===void 0)Vt.setupRenderTarget(R);else if(Mt.__hasExternalTextures)Vt.rebindTextures(R,yt.get(R.texture).__webglTexture,yt.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const It=R.depthTexture;if(Mt.__boundDepthTexture!==It){if(It!==null&&yt.has(It)&&(R.width!==It.image.width||R.height!==It.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Vt.setupDepthRenderbuffer(R)}}const Ft=R.texture;(Ft.isData3DTexture||Ft.isDataArrayTexture||Ft.isCompressedArrayTexture)&&(lt=!0);const zt=yt.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(zt[B])?z=zt[B][X]:z=zt[B],st=!0):R.samples>0&&Vt.useMultisampledRTT(R)===!1?z=yt.get(R).__webglMultisampledFramebuffer:Array.isArray(zt)?z=zt[X]:z=zt,u.copy(R.viewport),N.copy(R.scissor),O=R.scissorTest}else u.copy(ht).multiplyScalar(V).floor(),N.copy(Rt).multiplyScalar(V).floor(),O=Gt;if(X!==0&&(z=pi),Et.bindFramebuffer(F.FRAMEBUFFER,z)&&q&&Et.drawBuffers(R,z),Et.viewport(u),Et.scissor(N),Et.setScissorTest(O),st){const Mt=yt.get(R.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+B,Mt.__webglTexture,X)}else if(lt){const Mt=B;for(let Ft=0;Ft<R.textures.length;Ft++){const zt=yt.get(R.textures[Ft]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Ft,zt.__webglTexture,X,Mt)}}else if(R!==null&&X!==0){const Mt=yt.get(R.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Mt.__webglTexture,X)}M=-1},this.readRenderTargetPixels=function(R,B,X,q,z,st,lt,St=0){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=yt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&lt!==void 0&&(Mt=Mt[lt]),Mt){Et.bindFramebuffer(F.FRAMEBUFFER,Mt);try{const Ft=R.textures[St],zt=Ft.format,It=Ft.type;if(!Nt.textureFormatReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Nt.textureTypeReadable(It)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=R.width-q&&X>=0&&X<=R.height-z&&(R.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+St),F.readPixels(B,X,q,z,bt.convert(zt),bt.convert(It),st))}finally{const Ft=U!==null?yt.get(U).__webglFramebuffer:null;Et.bindFramebuffer(F.FRAMEBUFFER,Ft)}}},this.readRenderTargetPixelsAsync=async function(R,B,X,q,z,st,lt,St=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Mt=yt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&lt!==void 0&&(Mt=Mt[lt]),Mt)if(B>=0&&B<=R.width-q&&X>=0&&X<=R.height-z){Et.bindFramebuffer(F.FRAMEBUFFER,Mt);const Ft=R.textures[St],zt=Ft.format,It=Ft.type;if(!Nt.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Nt.textureTypeReadable(It))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ie=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,ie),F.bufferData(F.PIXEL_PACK_BUFFER,st.byteLength,F.STREAM_READ),R.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+St),F.readPixels(B,X,q,z,bt.convert(zt),bt.convert(It),0);const ue=U!==null?yt.get(U).__webglFramebuffer:null;Et.bindFramebuffer(F.FRAMEBUFFER,ue);const Lt=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await od(F,Lt,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,ie),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,st),F.deleteBuffer(ie),F.deleteSync(Lt),st}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,B=null,X=0){const q=Math.pow(2,-X),z=Math.floor(R.image.width*q),st=Math.floor(R.image.height*q),lt=B!==null?B.x:0,St=B!==null?B.y:0;Vt.setTexture2D(R,0),F.copyTexSubImage2D(F.TEXTURE_2D,X,0,0,lt,St,z,st),Et.unbindTexture()};const as=F.createFramebuffer(),qn=F.createFramebuffer();this.copyTextureToTexture=function(R,B,X=null,q=null,z=0,st=null){st===null&&(z!==0?(Zr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),st=z,z=0):st=0);let lt,St,Mt,Ft,zt,It,ie,ue,Lt;const kt=R.isCompressedTexture?R.mipmaps[st]:R.image;if(X!==null)lt=X.max.x-X.min.x,St=X.max.y-X.min.y,Mt=X.isBox3?X.max.z-X.min.z:1,Ft=X.min.x,zt=X.min.y,It=X.isBox3?X.min.z:0;else{const an=Math.pow(2,-z);lt=Math.floor(kt.width*an),St=Math.floor(kt.height*an),R.isDataArrayTexture?Mt=kt.depth:R.isData3DTexture?Mt=Math.floor(kt.depth*an):Mt=1,Ft=0,zt=0,It=0}q!==null?(ie=q.x,ue=q.y,Lt=q.z):(ie=0,ue=0,Lt=0);const Jt=bt.convert(B.format),At=bt.convert(B.type);let oe;B.isData3DTexture?(Vt.setTexture3D(B,0),oe=F.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(Vt.setTexture2DArray(B,0),oe=F.TEXTURE_2D_ARRAY):(Vt.setTexture2D(B,0),oe=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,B.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,B.unpackAlignment);const $t=F.getParameter(F.UNPACK_ROW_LENGTH),we=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Ve=F.getParameter(F.UNPACK_SKIP_PIXELS),De=F.getParameter(F.UNPACK_SKIP_ROWS),fn=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,kt.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,kt.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Ft),F.pixelStorei(F.UNPACK_SKIP_ROWS,zt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,It);const _e=R.isDataArrayTexture||R.isData3DTexture,sn=B.isDataArrayTexture||B.isData3DTexture;if(R.isDepthTexture){const an=yt.get(R),Ge=yt.get(B),Ke=yt.get(an.__renderTarget),ls=yt.get(Ge.__renderTarget);Et.bindFramebuffer(F.READ_FRAMEBUFFER,Ke.__webglFramebuffer),Et.bindFramebuffer(F.DRAW_FRAMEBUFFER,ls.__webglFramebuffer);for(let mi=0;mi<Mt;mi++)_e&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,yt.get(R).__webglTexture,z,It+mi),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,yt.get(B).__webglTexture,st,Lt+mi)),F.blitFramebuffer(Ft,zt,lt,St,ie,ue,lt,St,F.DEPTH_BUFFER_BIT,F.NEAREST);Et.bindFramebuffer(F.READ_FRAMEBUFFER,null),Et.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(z!==0||R.isRenderTargetTexture||yt.has(R)){const an=yt.get(R),Ge=yt.get(B);Et.bindFramebuffer(F.READ_FRAMEBUFFER,as),Et.bindFramebuffer(F.DRAW_FRAMEBUFFER,qn);for(let Ke=0;Ke<Mt;Ke++)_e?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,an.__webglTexture,z,It+Ke):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,an.__webglTexture,z),sn?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ge.__webglTexture,st,Lt+Ke):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ge.__webglTexture,st),z!==0?F.blitFramebuffer(Ft,zt,lt,St,ie,ue,lt,St,F.COLOR_BUFFER_BIT,F.NEAREST):sn?F.copyTexSubImage3D(oe,st,ie,ue,Lt+Ke,Ft,zt,lt,St):F.copyTexSubImage2D(oe,st,ie,ue,Ft,zt,lt,St);Et.bindFramebuffer(F.READ_FRAMEBUFFER,null),Et.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else sn?R.isDataTexture||R.isData3DTexture?F.texSubImage3D(oe,st,ie,ue,Lt,lt,St,Mt,Jt,At,kt.data):B.isCompressedArrayTexture?F.compressedTexSubImage3D(oe,st,ie,ue,Lt,lt,St,Mt,Jt,kt.data):F.texSubImage3D(oe,st,ie,ue,Lt,lt,St,Mt,Jt,At,kt):R.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,st,ie,ue,lt,St,Jt,At,kt.data):R.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,st,ie,ue,kt.width,kt.height,Jt,kt.data):F.texSubImage2D(F.TEXTURE_2D,st,ie,ue,lt,St,Jt,At,kt);F.pixelStorei(F.UNPACK_ROW_LENGTH,$t),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,we),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Ve),F.pixelStorei(F.UNPACK_SKIP_ROWS,De),F.pixelStorei(F.UNPACK_SKIP_IMAGES,fn),st===0&&B.generateMipmaps&&F.generateMipmap(oe),Et.unbindTexture()},this.initRenderTarget=function(R){yt.get(R).__webglFramebuffer===void 0&&Vt.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?Vt.setTextureCube(R,0):R.isData3DTexture?Vt.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Vt.setTexture2DArray(R,0):Vt.setTexture2D(R,0),Et.unbindTexture()},this.resetState=function(){b=0,C=0,U=null,Et.reset(),dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=he._getDrawingBufferColorSpace(t),e.unpackColorSpace=he._getUnpackColorSpace()}}const no=150,No=no-3,vc=2.45,o_=130,Mc=.72,s_=9.8,a_=4.65,ci=-.435,Go=.34,_r=2.35,Wa=.33*_r,l_=.3*_r,c_=.4*_r,Ar=.48*_r,Ai=2.15,kh=8,cl=.98,ir=14.8,Ws=ir+cl*kh,Ze=22.4,h_=-Ze+4.6,Hh=Ze-.95,yc=Hh+Ze,Zt=12.6,Xt=18.8,Sc=3.3,Tc=12,le=5.8,Je=2.45,_n=2,di=.22,Ec=25,u_=15,bc=1.16,wc=.78,d_=5,Ac=10,f_=3.95,p_=.52,m_=1.6,g_=1.28,__=.22,Rc=4.8,Cc=5,x_=.009,v_=3.1,Xs=3.8,Pc=1.9,M_=3.4,Lc=2,hl={1:"1 FREE",2:"2 JUKU FOLLOW",3:"3 TV 2IN1",4:"4 TOP DOWN"},Dc={1:{min:.55,max:2.8},2:{min:.8,max:1.9},3:{min:.78,max:1.55},4:{min:1.1,max:2.8}},Vh={auto:"AUTO",calm:"CALM",angry:"ANGRY",surprised:"WOW",happy:"HAPPY",sad:"SAD"},Ic={red:"Bosbos",blue:"Volta"},y_={red:[{number:1,name:"Markus Saar"},{number:4,name:"Karl Tamm"},{number:17,name:"Rene Kask"},{number:9,name:"Artur Lepp"},{number:11,name:"Martin Kuusk"},{number:27,name:"Sander Oja"}],blue:[{number:1,name:"Rasmus Kivi"},{number:5,name:"Oliver Kask"},{number:14,name:"Mark Randel"},{number:19,name:"Mihkel Aron"},{number:51,name:"Lucas Nikolas"},{number:7,name:"Teodor"}]},S_=document.querySelector("#scene"),Uc=document.querySelector("#camera-status"),Nc=document.querySelector("#face-status"),Fc=document.querySelector("#score-status"),An=document.querySelector("#attack-status"),Hn=document.querySelector("#player-status");document.querySelector("#touch-actions");const ni=document.querySelector("#touch-jump"),Rn=document.querySelector("#touch-equip"),Oc=document.querySelector("#touch-zoom-in"),Bc=document.querySelector("#touch-zoom-out"),zc=document.querySelector("#touch-camera-name"),kc=document.querySelector("#touch-face-name"),$o=Array.from(document.querySelectorAll(".touch-camera-button")),jo=Array.from(document.querySelectorAll(".touch-face-button")),pr=document.querySelector("#touch-joystick"),Hc=document.querySelector("#touch-joystick-thumb"),Qo=document.querySelector("#install-app"),Zs=document.querySelector("#install-debug");let Pi=null;const Oe=document.createElement("div");Oe.style.position="fixed";Oe.style.pointerEvents="none";Oe.style.display="none";Oe.style.zIndex="12";Oe.style.border="2px solid rgba(255,255,255,0.92)";Oe.style.borderRadius="14px";Oe.style.boxShadow="0 14px 30px rgba(15,23,42,0.28)";Oe.style.overflow="hidden";Oe.style.background="transparent";const bn=document.createElement("div");bn.textContent="LIVE 2";bn.style.position="absolute";bn.style.left="10px";bn.style.top="10px";bn.style.padding="4px 8px";bn.style.borderRadius="999px";bn.style.background="rgba(15,23,42,0.82)";bn.style.color="#f8fafc";bn.style.font="700 11px/1.1 system-ui, sans-serif";bn.style.letterSpacing="0.12em";Oe.appendChild(bn);document.body.appendChild(Oe);const ge=document.createElement("div");ge.style.position="fixed";ge.style.left="50%";ge.style.top="50%";ge.style.transform="translate(-50%, -50%) scale(0.82)";ge.style.opacity="0";ge.style.display="none";ge.style.pointerEvents="none";ge.style.zIndex="18";ge.style.minWidth="min(72vw, 680px)";ge.style.padding="26px 34px";ge.style.borderRadius="28px";ge.style.textAlign="center";ge.style.background="linear-gradient(180deg, rgba(15,23,42,0.28), rgba(15,23,42,0.08))";ge.style.boxShadow="0 18px 42px rgba(15,23,42,0.16)";ge.style.backdropFilter="none";ge.style.border="1px solid rgba(255,255,255,0.08)";const Xn=document.createElement("div");Xn.textContent="GOAL";Xn.style.font='900 clamp(48px, 11vw, 124px)/0.9 "Trebuchet MS", Verdana, sans-serif';Xn.style.letterSpacing="0.16em";Xn.style.textIndent="0.16em";Xn.style.color="#f8fafc";Xn.style.textShadow="0 8px 18px rgba(15,23,42,0.22)";const fi=document.createElement("div");fi.style.marginTop="16px";fi.style.font='700 clamp(18px, 3vw, 32px)/1.1 "Trebuchet MS", Verdana, sans-serif';fi.style.letterSpacing="0.08em";fi.style.textTransform="uppercase";fi.style.color="#dbeafe";ge.appendChild(Xn);ge.appendChild(fi);document.body.appendChild(ge);const $e=new r_({canvas:S_,antialias:!0});$e.setPixelRatio(Math.min(window.devicePixelRatio,2));$e.shadowMap.enabled=!0;$e.shadowMap.type=Jc;const dn=new Pd;dn.background=new ne(9684477);dn.fog=new rl(9684477,48,138);const xn=new te;dn.add(xn);const ce=new nn(70,1,.1,300);ce.position.set(0,11.2,30.4);ce.lookAt(0,2.1,0);xn.add(ce);const ii=new nn(ce.fov,1,.1,300),T_=new _f(15267071,4223533,1.7);dn.add(T_);const Un=new Mf(16777215,1.55);Un.position.set(8,20,12);Un.castShadow=!0;Un.shadow.mapSize.set(2048,2048);Un.shadow.camera.left=-154;Un.shadow.camera.right=no+4;Un.shadow.camera.top=no+4;Un.shadow.camera.bottom=-154;Un.shadow.camera.near=1;Un.shadow.camera.far=no*2.65;dn.add(Un);const E_=A_();dn.add(E_);const b_=L_();dn.add(b_);const oi=D_();dn.add(oi.group);ar(oi);const Ht=P_(),ul=Ya("Juku","rgba(29,99,181,0.92)");ul.position.set(0,4.22,0);ul.material.opacity=.82;Ht.root.add(ul);dn.add(Ht.root);const zr=qh();zr.root.visible=!1;dn.add(zr.root);const w={keys:new Set,prevEnter:!1,prevE:!1,jumpState:0,jumpTimer:0,jumpY:0,jumpVel:0,crouchBlend:0,pushBlend:0,airBlend:0,x:Zt+5.2,z:-7.8,yaw:-115,walkCycle:0,walkBlend:0,turnCycle:0,turnBlend:0,swordHeld:!0,swordX:.45,swordZ:-2.8,swordYaw:18,activeCam:1,cameraYaw:90,cameraZoom:1.28,cameraZoomTarget:1.28,cameraZoomMemory:{1:{zoom:1.28,target:1.28},2:{zoom:1.06,target:1.06},3:{zoom:.98,target:.98},4:{zoom:1.72,target:1.72}},cam2Yaw:.678,cam2Distance:9.25,cam2Height:4.17,cam2PrevX:Zt+5.2,cam2PrevZ:-7.8,cam2FocusX:Zt+5.2,cam2FocusZ:-7.8,cam3Side:1,cam3SideBlend:1,cam3SetupA:null,cam3SetupB:null,touchMove:0,touchTurn:0,touchJump:!1,touchETrigger:!1,touchPointerId:null,touchJumpPointerId:null,pointerX:0,pointerY:0,faceMode:"auto",faceTime:0,blinkTimer:0,nextBlink:1.6+Math.random()*2.2,tongueActive:!1,tongueBlend:0,tongueTimer:0,nextTongueEvent:.9+Math.random()*2.8,tonguePhase:Math.random()*Math.PI*2,lastT:performance.now()};xn.position.set(0,11.2,0);xn.rotation.y=P.degToRad(w.cameraYaw);window.addEventListener("keydown",n=>{w.keys.add(n.code),n.code==="Digit1"&&rr(1),n.code==="Digit2"&&rr(2),n.code==="Digit3"&&rr(3),n.code==="Digit4"&&rr(4),n.code==="KeyZ"&&Ei("calm"),n.code==="KeyX"&&Ei("angry"),n.code==="KeyC"&&Ei("surprised"),n.code==="KeyB"&&Ei("happy"),n.code==="KeyN"&&Ei("sad"),n.code==="KeyV"&&Ei("auto")});window.addEventListener("keyup",n=>{w.keys.delete(n.code)});window.addEventListener("mousemove",n=>{w.pointerX=n.clientX/window.innerWidth*2-1,w.pointerY=n.clientY/window.innerHeight*2-1});window.addEventListener("wheel",n=>{const t=n.deltaY>0?.12:-.12;$r(t),n.preventDefault()},{passive:!1});window.addEventListener("resize",Yh);Yh();function Gh(n,t,e){!pr||!Hc||(pr.classList.toggle("is-active",e),Hc.style.transform=`translate(calc(-50% + ${n}px), calc(-50% + ${t}px))`)}function Vc(){w.touchMove=0,w.touchTurn=0,w.touchPointerId=null,Gh(0,0,!1)}function Ys(n){ni&&ni.classList.toggle("is-active",n)}function Gc(n){Rn&&Rn.classList.toggle("is-active",n)}function Wh(){if(kc&&(kc.textContent=Vh[w.faceMode]||w.faceMode.toUpperCase()),!!jo.length)for(const n of jo)n.classList.toggle("is-active",n.dataset.face===w.faceMode)}function Ei(n){w.faceMode=n,rr(2),Wh()}function Xh(){if(zc&&(zc.textContent=hl[w.activeCam]),!!$o.length)for(const n of $o)n.classList.toggle("is-active",Number(n.dataset.cam)===w.activeCam)}function Xa(n,t){const e=Dc[n]||Dc[1];return P.clamp(t,e.min,e.max)}function w_(n){const t=Xa(w.activeCam,n);w.cameraZoomTarget=t,w.cameraZoomMemory[w.activeCam]&&(w.cameraZoomMemory[w.activeCam].target=t)}function $r(n){w_(w.cameraZoomTarget+n)}function Zh(){if(Rn){if(w.swordHeld){Rn.textContent="DROP";return}Rn.textContent="PICK UP"}}function rr(n){if(!hl[n])return;w.cameraZoomMemory[w.activeCam]&&(w.cameraZoomMemory[w.activeCam].zoom=w.cameraZoom,w.cameraZoomMemory[w.activeCam].target=w.cameraZoomTarget),w.activeCam=n;const t=w.cameraZoomMemory[n];t&&(w.cameraZoom=Xa(n,t.zoom),w.cameraZoomTarget=Xa(n,t.target)),Xh()}function Wc(n){if(!pr)return;const t=pr.getBoundingClientRect(),e=t.left+t.width*.5,i=t.top+t.height*.5,r=n.clientX-e,o=n.clientY-i,s=t.width*.36,a=Math.hypot(r,o),l=a>s?s/Math.max(a,.001):1,c=r*l,d=o*l,h=c/Math.max(s,1),f=d/Math.max(s,1);w.touchTurn=P.clamp(-h,-1,1),w.touchMove=P.clamp(-f,-1,1),Gh(c,d,!0)}if(ni){const n=t=>{w.touchJumpPointerId!==null&&t.pointerId!==w.touchJumpPointerId||(w.touchJump=!1,w.touchJumpPointerId=null,Ys(!1))};ni.addEventListener("pointerdown",t=>{w.touchJump=!0,w.touchJumpPointerId=t.pointerId,ni.setPointerCapture?.(t.pointerId),Ys(!0),t.preventDefault()}),ni.addEventListener("pointerup",n),ni.addEventListener("pointercancel",n),ni.addEventListener("lostpointercapture",()=>{w.touchJump=!1,w.touchJumpPointerId=null,Ys(!1)})}if(Rn){const n=()=>{Gc(!1)};Rn.addEventListener("pointerdown",t=>{w.touchETrigger=!0,Gc(!0),t.preventDefault()}),Rn.addEventListener("pointerup",n),Rn.addEventListener("pointercancel",n),Rn.addEventListener("lostpointercapture",n)}if($o.length){for(const n of $o)n.addEventListener("pointerdown",t=>{const e=Number(n.dataset.cam);Number.isFinite(e)&&rr(e),t.preventDefault()});Xh()}if(jo.length)for(const n of jo)n.addEventListener("pointerdown",t=>{n.dataset.face&&Ei(n.dataset.face),t.preventDefault()});Wh();Zh();Oc&&Oc.addEventListener("pointerdown",n=>{$r(-.14),n.preventDefault()});Bc&&Bc.addEventListener("pointerdown",n=>{$r(.14),n.preventDefault()});if(pr){const n=pr.querySelector(".touch-joystick-base");n?.addEventListener("pointerdown",e=>{w.touchPointerId=e.pointerId,n.setPointerCapture?.(e.pointerId),Wc(e),e.preventDefault()}),n?.addEventListener("pointermove",e=>{w.touchPointerId===e.pointerId&&(Wc(e),e.preventDefault())});const t=e=>{w.touchPointerId===e.pointerId&&Vc()};n?.addEventListener("pointerup",t),n?.addEventListener("pointercancel",t),n?.addEventListener("lostpointercapture",()=>{Vc()})}function Yh(){const n=window.innerWidth,t=window.innerHeight;ce.aspect=n/Math.max(t,1),ce.updateProjectionMatrix(),$e.setSize(n,t,!1),ii.fov=ce.fov,ii.updateProjectionMatrix()}function A_(){const n=new te,t=new Ae(new Yr(no,96),new vn({color:3571509,roughness:1}));return t.rotation.x=-Math.PI/2,t.receiveShadow=!0,n.add(t),n}function R_(n){return new vn({color:n,roughness:.95})}function gt(n,t,e,i,r){const o=new Ae(t,R_(e));return o.position.copy(i),r&&o.rotation.set(r.x,r.y,r.z),o.castShadow=!0,o.receiveShadow=!0,n.add(o),o}function ve(n,t,e,i,r,o){const s=gt(n,t,e,i,o);return s.scale.copy(r),s}function Xc(n,t,e){const i=new te;n.add(i),ve(i,new Bt(.07,18,14),t.skin,new E(0,-.065,.028),new E(.66,.48,1.02)),ve(i,new Bt(.05,16,12),t.skin,new E(0,-.108,.01),new E(.52,.3,.72)),ve(i,new Bt(.055,16,12),t.skin,new E(-e*.028,-.062,-.004),new E(.72,.58,1)),[{x:-.026,len1:.058,len2:.041,spread:-16},{x:-.009,len1:.083,len2:.057,spread:-6},{x:.01,len1:.078,len2:.054,spread:4},{x:.026,len1:.056,len2:.039,spread:13}].forEach(({x:a,len1:l,len2:c,spread:d},h)=>{const f=new te;f.position.set(a,-.028,.075),f.rotation.set(P.degToRad(h+1),P.degToRad(e*d),0),i.add(f),ve(f,new je(.0086,l-.017,4,8),t.skin,new E(0,-l*.5,0),new E(.95,1,.95));const m=new te;m.position.y=-l,m.rotation.x=P.degToRad(8+h),f.add(m),ve(m,new je(.0071,c-.015,4,8),t.skin,new E(0,-c*.5,0),new E(.94,1,.94))});const o=new te;o.position.set(-e*.048,-.08,.004),o.rotation.set(P.degToRad(-16),P.degToRad(-e*58),P.degToRad(-e*22)),i.add(o),ve(o,new je(.0082,.026,4,8),t.skin,new E(0,-.019,0),new E(1,1,.95));const s=new te;return s.position.y=-.038,s.rotation.x=P.degToRad(-6),o.add(s),ve(s,new je(.0065,.02,4,8),t.skin,new E(0,-.015,0),new E(1,1,.95)),i}function C_(n,t,e){const i=new te;n.add(i),ve(i,new Bt(.074,18,14),t.skin,new E(0,-.058,.034),new E(.76,.5,1.06)),ve(i,new Bt(.052,16,12),t.skin,new E(0,-.1,.004),new E(.56,.34,.78)),[{x:-.028,len1:.062,len2:.045,spread:-7},{x:-.01,len1:.078,len2:.056,spread:-3},{x:.01,len1:.076,len2:.054,spread:3},{x:.028,len1:.06,len2:.043,spread:7}].forEach(({x:a,len1:l,len2:c,spread:d},h)=>{const f=new te;f.position.set(a,-.034,.066),f.rotation.set(P.degToRad(24+h*2),P.degToRad(e*d),0),i.add(f),ve(f,new je(.0105,l-.018,4,8),t.skin,new E(0,-l*.5,0),new E(1,1,.96));const m=new te;m.position.y=-l,m.rotation.x=P.degToRad(18),f.add(m),ve(m,new je(.0085,c-.015,4,8),t.skin,new E(0,-c*.5,0),new E(1,1,.96))});const o=new te;o.position.set(-e*.04,-.048,.052),o.rotation.set(P.degToRad(-30),P.degToRad(-e*46),P.degToRad(-e*16)),i.add(o),ve(o,new je(.009,.03,4,8),t.skin,new E(0,-.02,0),new E(1,1,.96));const s=new te;return s.position.y=-.04,s.rotation.x=P.degToRad(-10),o.add(s),ve(s,new je(.007,.023,4,8),t.skin,new E(0,-.016,0),new E(1,1,.96)),i}function P_(){const n=new te;n.position.y=ci;const t={skin:15188387,shirt:2974645,pants:12918826,shoe:1381912,hair:3086863,white:16185339},e=new te;e.position.set(0,2.15,-.03),n.add(e);const i=gt(n,new Le(.42,.34,.28,28),t.pants,new E(0,1.81,-.02));i.scale.z=.88,gt(e,new Le(.48,.39,.24,28),t.shirt,new E(0,.43,0)),gt(e,new Le(.39,.27,.32,28),t.shirt,new E(0,.15,0)),gt(e,new Le(.27,.34,.23,28),2579108,new E(0,-.12,0)),gt(e,new Bt(.18,18,14),3895233,new E(0,.18,.15)).scale.set(.85,1.1,.34),gt(e,new Bt(.16,18,14),3631287,new E(0,-.05,.13)).scale.set(.8,1,.32),gt(n,new rs(.17,.04,10,20),t.white,new E(0,2.75,.02),new Re(Math.PI/2,0,0));const s=gt(n,new Le(.095,.12,.27,16),t.skin,new E(0,2.89,.01));s.scale.z=.88;const a=new te;a.position.set(0,3.27,0),n.add(a),gt(a,new Bt(.44,30,22),t.skin,new E(0,0,0)).scale.set(.92,1.02,.95),gt(a,new Bt(.09,16,12),t.skin,new E(-.4,.03,0)),gt(a,new Bt(.09,16,12),t.skin,new E(.4,.03,0)),gt(a,new Bt(.45,26,18,0,Math.PI*2,0,Math.PI*.46),t.hair,new E(0,.23,-.035)).scale.set(.94,.82,.95);const d=new te;d.position.set(-.138,.058,.372),a.add(d),d.scale.z=.62,gt(d,new Bt(.072,18,14),16777215,new E(0,0,0));const h=gt(d,new Bt(.031,14,10),3963381,new E(0,-.007,.048));gt(d,new Bt(.015,10,8),1250327,new E(0,-.007,.073));const f=ve(d,new Bt(.05,14,10),t.skin,new E(0,.046,.03),new E(1.7,.19,.54)),m=ve(d,new Bt(.048,14,10),t.skin,new E(0,-.046,.03),new E(1.65,.13,.52));f.visible=!1,m.visible=!1;const x=new te;x.position.set(.138,.058,.372),a.add(x),x.scale.z=.62,gt(x,new Bt(.072,18,14),16777215,new E(0,0,0));const v=gt(x,new Bt(.031,14,10),3963381,new E(0,-.007,.048));gt(x,new Bt(.015,10,8),1250327,new E(0,-.007,.073));const g=ve(x,new Bt(.05,14,10),t.skin,new E(0,.046,.03),new E(1.7,.19,.54)),p=ve(x,new Bt(.048,14,10),t.skin,new E(0,-.046,.03),new E(1.65,.13,.52));g.visible=!1,p.visible=!1;const A=gt(a,new je(.012,.08,4,8),t.hair,new E(-.17,.18,.38),new Re(0,0,P.degToRad(82))),T=gt(a,new je(.012,.08,4,8),t.hair,new E(.17,.18,.38),new Re(0,0,P.degToRad(-82)));gt(a,new Bt(.06,14,12),14389382,new E(0,-.022,.45)).scale.set(1.08,1,1.35);const L=new te;L.position.set(0,-.17,.402),a.add(L);const b=ve(L,new Bt(.046,16,12),12077135,new E(0,0,0),new E(2.18,.25,.56)),C=ve(L,new Bt(.042,16,12),6100765,new E(0,-.008,.016),new E(1.42,.1,.44)),U=ve(L,new Bt(.024,12,10),14255499,new E(0,-.022,.024),new E(1.55,.32,1.02)),M=ts(t,!1),_=ts(t,!0);M.root.position.set(.47,2.49,0),_.root.position.set(-.47,2.49,0),n.add(M.root,_.root);const u=qh();u.root.scale.setScalar(.88),u.root.position.set(.015,-.08,.16),u.root.rotation.set(P.degToRad(-104),0,P.degToRad(-10)),_.handPivot.add(u.root);const N=es(t),O=es(t);return N.root.position.set(.17,1.58,-.02),O.root.position.set(-.17,1.58,-.02),n.add(N.root,O.root),{root:n,hips:i,torso:e,head:a,leftEye:d,rightEye:x,leftUpperLid:f,leftLowerLid:m,rightUpperLid:g,rightLowerLid:p,leftPupil:h,rightPupil:v,pupilBase:{left:new E(0,-.007,.048),right:new E(0,-.007,.048)},leftBrow:A,rightBrow:T,browBase:{left:new E(-.17,.18,.38),right:new E(.17,.18,.38)},mouth:L,mouthLine:b,mouthInner:C,tongue:U,leftArm:M,rightArm:_,heldSword:u,leftLeg:N,rightLeg:O}}function ts(n,t){const e=new te,i=new te,r=new te,o=new te;if(e.add(i),gt(i,new Bt(.084,18,14),n.skin,new E(0,0,0)),gt(i,new Le(.066,.056,.35,18),n.skin,new E(0,-.175,0)),r.position.set(0,-.35,0),i.add(r),gt(r,new Bt(.066,16,12),n.skin,new E(0,0,0)),gt(r,new Le(.053,.044,.31,18),n.skin,new E(0,-.155,0)),o.position.set(0,-.31,0),r.add(o),t){const s=Xc(o,n,-1),a=C_(o,n,-1);return a.visible=!1,{root:e,upperPivot:i,lowerPivot:r,handPivot:o,swordHand:t,openHand:s,gripHand:a}}else{const s=Xc(o,n,1);return{root:e,upperPivot:i,lowerPivot:r,handPivot:o,swordHand:t,openHand:s,gripHand:null}}}function es(n){const t=new te,e=new te,i=new te;return gt(t,new Bt(.092,16,12),n.pants,new E(0,0,0)),gt(t,new Le(.094,.074,.56,18),n.pants,new E(0,-.28,0)),e.position.set(0,-.56,0),t.add(e),gt(e,new Bt(.094,14,10),n.pants,new E(0,0,0)),ve(e,new Bt(.05,12,10),14698061,new E(0,.009,.058),new E(.96,.72,.48)),gt(e,new Le(.078,.064,.5,18),n.pants,new E(0,-.25,0)),i.position.set(0,-.5,0),e.add(i),gt(i,new Bt(.074,12,10),n.shoe,new E(0,0,0)),ve(i,new Bt(.12,18,14),n.shoe,new E(0,-.042,.112),new E(.96,.36,1.72)),ve(i,new Bt(.08,16,12),2303015,new E(0,-.018,.238),new E(1,.38,.98)),{root:t,kneePivot:e,footPivot:i}}function qh(){const n=new te;return gt(n,new Le(.013,.0115,.112,12),5978138,new E(0,-.07,.012),new Re(0,0,0)),gt(n,new Bt(.018,12,10),12041413,new E(0,-.126,.012)),gt(n,new Le(.062,.062,.008,20),13159634,new E(0,0,.028),new Re(Math.PI/2,0,0)),[14476287,12575743,11662804,13954903,16096612,15305174].forEach((e,i)=>{gt(n,new Pe(.026,.057,.02),e,new E(0,-.09-i*.057,.028))}),gt(n,new Le(.011,.0036,.11,12),15856891,new E(0,-.47,.028)),n.traverse(e=>{e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0)}),{root:n}}function Kh(n){return ir+cl*(n+.5)}function kr(n){const t=Kh(n);return Ze*4+Math.PI*2*t}function si(n,t){return{x:-t,z:n}}function Fo(n,t){return{dirX:-t,dirZ:n}}function jr(n,t){const e=Kh(n),i=Ze*2,r=Math.PI*e,o=i*2+r*2;let s=(t%o+o)%o;if(s<=i){const f=-Ze+s,m=-e,x=si(f,m),v=Fo(1,0);return{x:x.x,z:x.z,dirX:v.dirX,dirZ:v.dirZ,segment:"homeStraight"}}if(s-=i,s<=r){const f=-Math.PI/2+s/e,m=Ze+Math.cos(f)*e,x=Math.sin(f)*e,v=si(m,x),g=Fo(-Math.sin(f),Math.cos(f));return{x:v.x,z:v.z,dirX:g.dirX,dirZ:g.dirZ,segment:"rightCurve"}}if(s-=r,s<=i){const f=Ze-s,x=si(f,e),v=Fo(-1,0);return{x:x.x,z:x.z,dirX:v.dirX,dirZ:v.dirZ,segment:"backStraight"}}s-=i;const a=Math.PI/2+s/e,l=-Ze+Math.cos(a)*e,c=Math.sin(a)*e,d=si(l,c),h=Fo(-Math.sin(a),Math.cos(a));return{x:d.x,z:d.z,dirX:h.dirX,dirZ:h.dirZ,segment:"leftCurve"}}function Za(n,t=.02,e=40){const i=[];for(let r=0;r<=e;r+=1){const o=r/e,s=-Ze+o*Ze*2,a=si(s,-n);i.push(new E(a.x,t,a.z))}for(let r=1;r<=e;r+=1){const o=-Math.PI/2+r/e*Math.PI,s=si(Ze+Math.cos(o)*n,Math.sin(o)*n);i.push(new E(s.x,t,s.z))}for(let r=1;r<=e;r+=1){const o=r/e,s=Ze-o*Ze*2,a=si(s,n);i.push(new E(a.x,t,a.z))}for(let r=1;r<=e;r+=1){const o=Math.PI/2+r/e*Math.PI,s=si(-Ze+Math.cos(o)*n,Math.sin(o)*n);i.push(new E(s.x,t,s.z))}return i}function qs(n,t){const e=new Rh,i=Za(t,0,44).map(r=>new vt(r.x,r.z));e.moveTo(i[0].x,i[0].y);for(let r=1;r<i.length;r+=1)e.lineTo(i[r].x,i[r].y);if(e.closePath(),Number.isFinite(n)&&n>0){const r=new ka,o=Za(n,0,44).map(s=>new vt(s.x,s.z)).reverse();r.moveTo(o[0].x,o[0].y);for(let s=1;s<o.length;s+=1)r.lineTo(o[s].x,o[s].y);r.closePath(),e.holes.push(r)}return e}function Ya(n,t,e="#ffffff"){const i=document.createElement("canvas");i.width=512,i.height=128;const r=i.getContext("2d");r.clearRect(0,0,i.width,i.height);const o=10,s=10,a=i.width-20,l=i.height-20,c=28;r.beginPath(),r.moveTo(o+c,s),r.lineTo(o+a-c,s),r.quadraticCurveTo(o+a,s,o+a,s+c),r.lineTo(o+a,s+l-c),r.quadraticCurveTo(o+a,s+l,o+a-c,s+l),r.lineTo(o+c,s+l),r.quadraticCurveTo(o,s+l,o,s+l-c),r.lineTo(o,s+c),r.quadraticCurveTo(o,s,o+c,s),r.closePath(),r.fillStyle=t,r.fill(),r.strokeStyle="rgba(255,255,255,0.46)",r.lineWidth=5,r.stroke(),r.fillStyle=e,r.font=`bold ${n.length>16?28:34}px Trebuchet MS`,r.textAlign="center",r.textBaseline="middle",r.fillText(n,i.width/2,i.height/2+1);const d=new yh(i);d.needsUpdate=!0;const h=new Dd(new vh({map:d,transparent:!0,opacity:.76,depthWrite:!1}));return h.scale.set(.82,.21,1),h.renderOrder=4,h}function Zc(n,t,e="#ffffff"){const i=document.createElement("canvas");i.width=160,i.height=160;const r=i.getContext("2d");r.clearRect(0,0,i.width,i.height),r.fillStyle=t,r.fillRect(0,0,i.width,i.height),r.strokeStyle="rgba(255,255,255,0.7)",r.lineWidth=8,r.strokeRect(8,8,i.width-16,i.height-16),r.fillStyle=e,r.font=`bold ${n.length>1?84:98}px Trebuchet MS`,r.textAlign="center",r.textBaseline="middle",r.fillText(n,i.width/2,i.height/2+2);const o=new yh(i);o.needsUpdate=!0;const s=new il({map:o,transparent:!0,alphaTest:.08,side:Mn}),a=new Ae(new Wn(.22,.22),s);return a.renderOrder=3,a}function L_(){const n=new te,t=new Ae(new Br(qs(ir,Ws),64),new vn({color:11358011,roughness:.9}));t.rotation.x=-Math.PI/2,t.position.y=.012,t.receiveShadow=!0,n.add(t);const e=new Ae(new Br(qs(ir-.18,ir),48),new vn({color:15791082,roughness:.9}));e.rotation.x=-Math.PI/2,e.position.y=.013,n.add(e);const i=new Ae(new Br(qs(Ws,Ws+.18),48),new vn({color:15791082,roughness:.9}));i.rotation.x=-Math.PI/2,i.position.y=.013,n.add(i);const r=new za({color:16248801,transparent:!0,opacity:.82});for(let C=1;C<kh;C+=1){const U=ir+cl*C;n.add(new ei(new Se().setFromPoints(Za(U,.022,52)),r))}const o=new Ae(new Wn(Zt*2,Xt*2),new vn({color:3116861,roughness:1}));o.rotation.x=-Math.PI/2,o.position.y=.014,o.receiveShadow=!0,n.add(o);const s=new za({color:15661035,transparent:!0,opacity:.94}),a=Zt-.08,l=Xt-.08,c=[new E(-a,.028,-l),new E(a,.028,-l),new E(a,.028,l),new E(-a,.028,l),new E(-a,.028,-l)];n.add(new ei(new Se().setFromPoints(c),s));const d=[];for(let C=0;C<=64;C+=1){const U=C/64*Math.PI*2;d.push(new E(Math.cos(U)*Sc,.028,Math.sin(U)*Sc))}n.add(new ei(new Se().setFromPoints(d),s)),n.add(new ei(new Se().setFromPoints([new E(-a,.028,0),new E(a,.028,0)]),s));const h=Math.min(Zt-1.15,4.2),f=2.45,m=Math.min(Zt-2.1,2.15),x=1.05;[-1,1].forEach(C=>{const U=C*l,M=U-C*f,_=U-C*x,u=[new E(-h,.028,U),new E(-h,.028,M),new E(h,.028,M),new E(h,.028,U)],N=[new E(-m,.028,U),new E(-m,.028,_),new E(m,.028,_),new E(m,.028,U)];n.add(new ei(new Se().setFromPoints(u),s)),n.add(new ei(new Se().setFromPoints(N),s))});const v=.085;[-1,1].forEach(C=>{const U=new Ae(new Yr(v,16),new vn({color:15661035,roughness:.9}));U.rotation.x=-Math.PI/2,U.position.set(0,.029,C*(l-1.85)),n.add(U)});const g=[-a,a],p=[-l,l],A=.9;[-1,1].forEach(C=>{const U=C*(l-1.85),M=C*(l-f),_=[];for(let u=0;u<=48;u+=1){const N=u/48*Math.PI*2,O=Math.cos(N)*A,k=U+Math.sin(N)*A;C*(k-M)<=.001&&_.push(new E(O,.028,k))}n.add(new ei(new Se().setFromPoints(_),s))});const T=.55;for(let C=0;C<g.length;C+=1)for(let U=0;U<p.length;U+=1){const M=Math.sign(g[C]),_=Math.sign(p[U]),u=[],N=M>0&&_>0?Math.PI:M>0&&_<0?Math.PI*.5:M<0&&_>0?Math.PI*1.5:0;for(let O=0;O<=16;O+=1){const k=N+O/16*(Math.PI*.5);u.push(new E(g[C]+Math.cos(k)*T,.028,p[U]+Math.sin(k)*T))}n.add(new ei(new Se().setFromPoints(u),s))}const y=new Ae(new Yr(.1,18),new vn({color:15661035,roughness:.9}));y.rotation.x=-Math.PI/2,y.position.set(0,.029,0),n.add(y);const L=[16007006,16096779,2278750,3718648];let b=0;for(let C=0;C<g.length;C+=1)for(let U=0;U<p.length;U+=1){const M=new te;M.position.set(g[C],.016,p[U]),gt(M,new Le(.028,.028,.8,10),16317180,new E(0,.4,0));const _=gt(M,new Wn(.34,.2),L[b%L.length],new E(.18,.66,0),new Re(0,Math.PI/2,0));_.material.side=Mn,_.material.transparent=!0,_.material.opacity=.95,n.add(M),b+=1}return n}function Ks(n){const t={skin:n.skin??15188387,shirt:n.shirt??3039665,pants:n.shorts??2043715,shoe:n.shoe??1447704,hair:n.hair??3086863,white:16185339},e=new ne(t.shirt).multiplyScalar(1.08).getHex(),i=new ne(t.shirt).multiplyScalar(.82).getHex(),r=new ne(t.shirt).multiplyScalar(.94).getHex(),o=new te;o.position.y=ci;const s=new te;s.position.set(0,2.15,-.03),o.add(s);const a=gt(o,new Le(.42,.34,.28,28),t.pants,new E(0,1.81,-.02));a.scale.z=.88,gt(s,new Le(.48,.39,.24,28),t.shirt,new E(0,.43,0)),gt(s,new Le(.39,.27,.32,28),t.shirt,new E(0,.15,0)),gt(s,new Le(.27,.34,.23,28),i,new E(0,-.12,0)),gt(s,new Bt(.18,18,14),e,new E(0,.18,.15)).scale.set(.85,1.1,.34),gt(s,new Bt(.16,18,14),r,new E(0,-.05,.13)).scale.set(.8,1,.32),gt(o,new rs(.17,.04,10,20),t.white,new E(0,2.75,.02),new Re(Math.PI/2,0,0));const d=gt(o,new Le(.095,.12,.27,16),t.skin,new E(0,2.89,.01));d.scale.z=.88;const h=new te;h.position.set(0,3.27,0),o.add(h),gt(h,new Bt(.44,30,22),t.skin,new E(0,0,0)).scale.set(.92,1.02,.95),gt(h,new Bt(.09,16,12),t.skin,new E(-.4,.03,0)),gt(h,new Bt(.09,16,12),t.skin,new E(.4,.03,0)),gt(h,new Bt(.45,26,18,0,Math.PI*2,0,Math.PI*.46),t.hair,new E(0,.23,-.035)).scale.set(.94,.82,.95);const x=new te;x.position.set(-.138,.058,.372),h.add(x),x.scale.z=.62,gt(x,new Bt(.072,18,14),16777215,new E(0,0,0)),gt(x,new Bt(.031,14,10),3963381,new E(0,-.007,.048)),gt(x,new Bt(.015,10,8),1250327,new E(0,-.007,.073));const v=new te;v.position.set(.138,.058,.372),h.add(v),v.scale.z=.62,gt(v,new Bt(.072,18,14),16777215,new E(0,0,0)),gt(v,new Bt(.031,14,10),3963381,new E(0,-.007,.048)),gt(v,new Bt(.015,10,8),1250327,new E(0,-.007,.073)),gt(h,new je(.012,.08,4,8),t.hair,new E(-.17,.18,.38),new Re(0,0,P.degToRad(82))),gt(h,new je(.012,.08,4,8),t.hair,new E(.17,.18,.38),new Re(0,0,P.degToRad(-82))),gt(h,new Bt(.06,14,12),14389382,new E(0,-.022,.45)).scale.set(1.08,1,1.35);const p=new te;p.position.set(0,-.17,.402),h.add(p),ve(p,new Bt(.046,16,12),12077135,new E(0,0,0),new E(2.18,.25,.56)),ve(p,new Bt(.042,16,12),6100765,new E(0,-.008,.016),new E(1.42,.1,.44));const A=ts(t,!1),T=ts(t,!1);A.root.position.set(.47,2.49,0),T.root.position.set(-.47,2.49,0),o.add(A.root,T.root);const y=es(t),L=es(t);return y.root.position.set(.17,1.58,-.02),L.root.position.set(-.17,1.58,-.02),o.add(y.root,L.root),o.traverse(b=>{b.isMesh&&(b.castShadow=!0,b.receiveShadow=!0)}),{root:o,hips:a,torso:s,torsoPivot:s,head:h,leftArmRig:A,rightArmRig:T,leftArm:A.upperPivot,rightArm:T.upperPivot,leftLegRig:y,rightLegRig:L,leftLeg:y.root,rightLeg:L.root,mouth:p,baseYUnscaled:ci,baseY:ci,nativeScale:1/_r,motionScale:1,runnerStyle:"juku"}}function Js(n,t=_r){const e=t*(n.nativeScale??1);n.motionScale=e,n.root.scale.setScalar(e);const i=n.baseYUnscaled??n.baseY;return n.baseY=i*e,n.root.position.y=n.baseY,n}function Wo(n,t,e,i=0,r=null){const o=P.clamp(r?.kickAmount??0,0,1),s=r?.kickSide===0?1:Math.sign(r?.kickSide??1),a=P.clamp(r?.sprintAmount??0,0,1),l=P.clamp(r?.type==="celebration"?r.amount??0:0,0,1),c=r?.side===0?1:Math.sign(r?.side??1),d=P.clamp(r?.bounce??0,0,1);if(n.runnerStyle!=="juku"){const L=P.clamp(t/2.8,0,1),b=.62+.38*L,C=1+a*.35,U=Math.sin(e)*1.02*L*C,M=n.motionScale??1,_=Math.abs(Math.sin(e*1.08))*.032*b*(1+a*.22)*M;if(n.root.position.y=n.baseY+_+i*M,n.torsoPivot.position.x=0,n.leftLeg.rotation.x=U,n.rightLeg.rotation.x=-U,n.leftLeg.rotation.z=0,n.rightLeg.rotation.z=0,n.leftArm.rotation.x=-U*(.9+a*.18)-.08-a*.18,n.rightArm.rotation.x=U*(.9+a*.18)-.08-a*.18,n.leftArm.rotation.y=0,n.rightArm.rotation.y=0,n.leftArm.rotation.z=P.degToRad(7+Math.sin(e*.5)*4),n.rightArm.rotation.z=P.degToRad(-7-Math.sin(e*.5)*4),n.torsoPivot.rotation.z=Math.sin(e*.5)*.075*L,n.torsoPivot.rotation.x=-.08-Math.abs(Math.sin(e))*.04*L-a*.18,n.head.rotation.x=-.04*a,n.head.rotation.z=Math.sin(e*.58)*.06*b+Math.sin(e*.24)*.03*a,n.smile&&(n.smile.rotation.z=Math.sin(e*.85)*.06),r?.type==="keeperDive"){const u=P.clamp(r.amount??0,0,1),N=r.dir===0?1:Math.sign(r.dir??1),O=N>0?n.leftArm:n.rightArm,k=N>0?n.rightArm:n.leftArm,H=N>0?n.leftLeg:n.rightLeg,G=N>0?n.rightLeg:n.leftLeg;n.torsoPivot.position.x=N*.055*u,n.torsoPivot.rotation.z+=N*.62*u,n.torsoPivot.rotation.x=-.14-.34*u,n.head.rotation.z+=N*.18*u,n.head.rotation.x=-.1*u,O.rotation.x=-1.95*u,O.rotation.z=N*1.28*u,O.rotation.y=N*.22*u,k.rotation.x=-1.42*u,k.rotation.z=N*.48*u,k.rotation.y=-N*.14*u,H.rotation.x=.48*u,H.rotation.z=N*.22*u,G.rotation.x=-.96*u,G.rotation.z=-N*.18*u}if(l>0){const u=.08+d*.12;n.torsoPivot.rotation.x+=.2*l,n.torsoPivot.rotation.z+=c*.12*l,n.head.rotation.x=-.1*l,n.head.rotation.z+=c*.06*l,n.leftArm.rotation.x=P.lerp(n.leftArm.rotation.x,-2.3+u,l),n.rightArm.rotation.x=P.lerp(n.rightArm.rotation.x,-2.3+u,l),n.leftArm.rotation.z=P.lerp(n.leftArm.rotation.z,.42+c*.12,l),n.rightArm.rotation.z=P.lerp(n.rightArm.rotation.z,-.42+c*.12,l),n.leftArm.rotation.y=P.lerp(n.leftArm.rotation.y,.08*c,l),n.rightArm.rotation.y=P.lerp(n.rightArm.rotation.y,.08*c,l),n.leftLeg.rotation.x=P.lerp(n.leftLeg.rotation.x,.2+d*.08,l*.5),n.rightLeg.rotation.x=P.lerp(n.rightLeg.rotation.x,.2+d*.08,l*.5)}r?.type==="keeperDive"&&n.smile&&(n.smile.rotation.z*=1-P.clamp(r.amount??0,0,1));return}const h=P.clamp(t/2.1,0,1),f=n.motionScale??1,m=Math.sin(e),x=P.clamp(Math.abs(i)/Math.max(.001,.36*Math.max(1,f)),0,1),v=P.smoothstep(x,.04,.95),g=a*(1-v*.72),p=m>=0?1:-1,A=Math.abs(Math.sin(e*1.08))*.024*(.4+h*.8+g*.14)*f;if(n.root.position.y=n.baseY+A+i*f,n.torsoPivot.position.x=.035*v,n.torsoPivot.rotation.z=Math.sin(e*.5)*.09*h,n.torsoPivot.rotation.x=-.1-Math.abs(m)*.06*h-h*.04-v*.22-g*.16,n.hips&&(n.hips.rotation.z=Math.sin(e)*.028*h,n.hips.rotation.y=Math.sin(e*.5)*(.03+g*.018)*h),n.head&&(n.head.position.y=3.27+v*.04,n.head.rotation.x=-.05*g,n.head.rotation.z=Math.sin(e*.32)*.025*g),n.mouth&&(n.mouth.rotation.z=0),[{arm:n.leftArmRig,side:1},{arm:n.rightArmRig,side:-1}].forEach(({arm:L,side:b})=>{const C=b===-1?e+Math.PI:e,U=Math.sin(C)*18*h*(1-x*.65)*(1+g*.34);if(L.upperPivot.rotation.z=P.degToRad(b*(16+Math.sin(e*.5)*2+g*5)),L.upperPivot.rotation.x=P.degToRad(-(8+18*x+U+g*12)),L.upperPivot.rotation.y=P.degToRad(b*(2.4+g*4.6)*h),L.lowerPivot.rotation.x=P.degToRad(-(14+18*x+Math.max(0,-Math.sin(C))*16*h+g*10)),v>0){const M=b===p;L.upperPivot.rotation.x=P.lerp(L.upperPivot.rotation.x,P.degToRad(M?-92:26),v),L.upperPivot.rotation.z=P.lerp(L.upperPivot.rotation.z,P.degToRad(M?b*18:b*8),v),L.lowerPivot.rotation.x=P.lerp(L.lowerPivot.rotation.x,P.degToRad(M?-24:-58),v)}}),[{leg:n.leftLegRig,side:1},{leg:n.rightLegRig,side:-1}].forEach(({leg:L,side:b})=>{const C=b===-1?e:e+Math.PI;let U=Math.sin(C)*30*h*(1+g*.24),M=10+(10+22*((-Math.sin(C)+1)*.5))*h+g*(4+Math.max(0,-Math.sin(C))*8),_=-6-U*.4-(M-8)*.24-g*2;if(x>0){const u=b===p;U=P.lerp(U,u?58:-26,v),M=P.lerp(M,u?18:82,v),_=P.lerp(_,u?-18:26,v)}L.root.rotation.z=P.degToRad(b*(4.5+Math.sin(e*.5)*.8)*h),L.root.rotation.x=P.degToRad(-5+U),L.kneePivot.rotation.x=P.degToRad(M),L.footPivot.rotation.x=P.degToRad(_)}),o>0){const L=s>0?n.leftLegRig:n.rightLegRig,b=s>0?n.rightLegRig:n.leftLegRig,C=s>0?n.rightArmRig:n.leftArmRig,U=s>0?n.leftArmRig:n.rightArmRig;L.root.rotation.x=P.lerp(L.root.rotation.x,P.degToRad(48),o),L.kneePivot.rotation.x=P.lerp(L.kneePivot.rotation.x,P.degToRad(8),o),L.footPivot.rotation.x=P.lerp(L.footPivot.rotation.x,P.degToRad(-16),o),b.root.rotation.x=P.lerp(b.root.rotation.x,P.degToRad(-18),o*.72),b.kneePivot.rotation.x=P.lerp(b.kneePivot.rotation.x,P.degToRad(28),o*.72),b.footPivot.rotation.x=P.lerp(b.footPivot.rotation.x,P.degToRad(14),o*.72),n.torsoPivot.rotation.x-=.14*o,n.torsoPivot.rotation.z+=-s*.09*o,C.upperPivot.rotation.x=P.lerp(C.upperPivot.rotation.x,P.degToRad(32),o),C.upperPivot.rotation.z=P.lerp(C.upperPivot.rotation.z,P.degToRad(-s*14),o),U.upperPivot.rotation.x=P.lerp(U.upperPivot.rotation.x,P.degToRad(-56),o),U.upperPivot.rotation.z=P.lerp(U.upperPivot.rotation.z,P.degToRad(s*22),o)}if(r?.type==="keeperDive"){const L=P.clamp(r.amount??0,0,1),b=r.dir===0?1:Math.sign(r.dir??1),C=b>0?n.leftArmRig.upperPivot:n.rightArmRig.upperPivot,U=b>0?n.rightArmRig.upperPivot:n.leftArmRig.upperPivot,M=b>0?n.leftLegRig.root:n.rightLegRig.root,_=b>0?n.rightLegRig.root:n.leftLegRig.root;n.torsoPivot.position.x=b*.055*L,n.torsoPivot.rotation.z+=b*.62*L,n.torsoPivot.rotation.x=-.14-.34*L,C.rotation.x=-1.95*L,C.rotation.z=b*1.28*L,C.rotation.y=b*.22*L,U.rotation.x=-1.42*L,U.rotation.z=b*.48*L,U.rotation.y=-b*.14*L,M.rotation.x=.48*L,M.rotation.z=b*.22*L,_.rotation.x=-.96*L,_.rotation.z=-b*.18*L}if(l>0){const L=P.degToRad(-146+d*10);n.torsoPivot.rotation.x+=.22*l,n.torsoPivot.rotation.z+=c*.12*l,n.head&&(n.head.rotation.x=-.12*l,n.head.rotation.z+=c*.04*l),n.leftArmRig.upperPivot.rotation.x=P.lerp(n.leftArmRig.upperPivot.rotation.x,L,l),n.rightArmRig.upperPivot.rotation.x=P.lerp(n.rightArmRig.upperPivot.rotation.x,L,l),n.leftArmRig.upperPivot.rotation.z=P.lerp(n.leftArmRig.upperPivot.rotation.z,P.degToRad(18+c*6),l),n.rightArmRig.upperPivot.rotation.z=P.lerp(n.rightArmRig.upperPivot.rotation.z,P.degToRad(-(18-c*6)),l),n.leftArmRig.lowerPivot.rotation.x=P.lerp(n.leftArmRig.lowerPivot.rotation.x,P.degToRad(-22),l),n.rightArmRig.lowerPivot.rotation.x=P.lerp(n.rightArmRig.lowerPivot.rotation.x,P.degToRad(-22),l),n.leftLegRig.root.rotation.x=P.lerp(n.leftLegRig.root.rotation.x,P.degToRad(8+d*5),l*.45),n.rightLegRig.root.rotation.x=P.lerp(n.rightLegRig.root.rotation.x,P.degToRad(8+d*5),l*.45)}}function D_(){const n=new te,t=new Ae(new Bt(di,16,12),new vn({color:16250868,roughness:.45}));t.position.set(0,di,0),t.castShadow=!0,t.receiveShadow=!0,n.add(t);const e=[],i=[];[-1,1].forEach(b=>{const C=new te,U=16317180,M=14412542,_=le*.5;gt(C,new Pe(.08,Je,.08),U,new E(-_,Je*.5,0)),gt(C,new Pe(.08,Je,.08),U,new E(_,Je*.5,0)),gt(C,new Pe(le+.12,.09,.09),U,new E(0,Je,0)),gt(C,new Pe(.08,.08,_n),U,new E(-_,Je,_n*.5)),gt(C,new Pe(.08,.08,_n),U,new E(_,Je,_n*.5)),gt(C,new Pe(.08,Je,.08),U,new E(-_,Je*.5,_n)),gt(C,new Pe(.08,Je,.08),U,new E(_,Je*.5,_n));const u=gt(C,new Wn(le,Je),M,new E(0,Je*.5,_n));u.material.transparent=!0,u.material.opacity=.4;const N=gt(C,new Wn(le,_n),M,new E(0,Je,_n*.5),new Re(-Math.PI/2,0,0));N.material.transparent=!0,N.material.opacity=.26,C.position.set(0,.02,b*(Xt-.9)),b<0&&(C.rotation.y=Math.PI),n.add(C),C.updateMatrixWorld(!0);const O=C.localToWorld(new E(0,0,_n*.5));i.push({type:"obb",x:O.x,z:O.z,halfX:le*.5+.18,halfZ:_n*.5+.18,yaw:C.rotation.y}),e.push(C)});const r=Js(Ks({shirt:15987958,shorts:1447964,shoe:1184534}));r.root.position.set(Zt+1.15,r.baseY,-3.4),r.root.rotation.y=P.degToRad(-90);const o=[-.18,-.12,-.06,0,.06,.12,.18];for(let b=0;b<o.length;b+=1){const C=o[b];gt(r.torsoPivot,new Pe(.07,.9,.035),1118740,new E(0,.16,C))}const s=gt(r.leftArmRig.handPivot,new Pe(.05,.022,.016),987413,new E(.016,-.026,.094),new Re(.18,0,0)),a=new Ae(new Pe(.088,.118,.01),new vn({color:16175917,roughness:.48,transparent:!0,opacity:0}));a.position.set(.02,-.024,.09),a.visible=!1,r.rightArmRig.handPivot.add(a);const l=new Ae(new Pe(.088,.118,.01),new vn({color:12658477,roughness:.48,transparent:!0,opacity:0}));l.position.set(.02,-.024,.078),l.visible=!1,r.rightArmRig.handPivot.add(l);const c=Ya("Ronaldo","rgba(17,24,39,0.92)");c.position.set(0,4.12,0),c.material.opacity=.52,r.root.add(c),n.add(r.root);const d={runner:r,label:c,sidelineOffset:Zt+1.15,perimeterOffset:1.15,perimeterT:Qh(Zt+1.15,-3.4,1.15),cycle:Math.random()*Math.PI*2,whistle:s,yellowCard:a,redCard:l,whistleTimer:0,cardTimer:0,cardCooldown:1.2,crowdTimer:0,cardColor:"yellow",lastBallHolder:null,lastControllingTeam:0},h=[],f=Tc/2,m=[0,-Zt*.42,Zt*.42,-Zt*.58,0,Zt*.58];for(let b=0;b<Tc;b+=1){const C=b<f?1:-1,U=C===1?"red":"blue",M=b%f,_=y_[U][M]??{number:0,name:U==="red"?`Punane ${M+1}`:`Sinine ${M+1}`},u=M===0?"keeper":M<=2?"defender":"attacker",N=m[M]??0,O=u==="keeper"?-C*(Xt-5.1):u==="defender"?-C*(Xt*.44-Math.abs(N)*.05)+(Math.random()-.5)*.8:-C*(Xt*.22-Math.abs(N)*.04)+(Math.random()-.5)*1.1,k=Js(Ks({shirt:C===1?13580847:1923252,shorts:C===1?6954779:1456233,shoe:1381911}));k.root.position.set(N,k.baseY,O);const H=Ya(`${_.number} ${_.name}`,C===1?"rgba(127,29,29,0.9)":"rgba(29,78,216,0.9)");H.position.set(0,4.18,0),k.root.add(H);const G=Zc(String(_.number),C===1?"#991b1b":"#1e40af");G.position.set(0,.22,.31),k.torsoPivot.add(G);const Z=Zc(String(_.number),C===1?"#991b1b":"#1e40af");Z.position.set(0,.22,-.31),Z.rotation.y=Math.PI,k.torsoPivot.add(Z),n.add(k.root);const V=u==="attacker"?Math.abs(N)<.4?"poacher":N<0?"playmaker":"runner":null,et=u==="attacker"?V==="poacher"?1.28+Math.random()*.22:V==="runner"?1.08+Math.random()*.2:.84+Math.random()*.16:u==="defender"?.38+Math.random()*.18:.18+Math.random()*.12;h.push({runner:k,team:C,teamName:U,shirtNumber:_.number,displayName:_.name,goalsScored:0,nameTag:H,home:new E(N,0,O),homeYaw:C===1?0:Math.PI,vx:0,vz:0,cycle:Math.random()*Math.PI*2,kickCooldown:Math.random()*.8,kickBlend:0,kickSide:M%2===0?1:-1,role:u,attackerProfile:V,shotHunger:et,roamX:u==="attacker"?(Math.random()-.5)*1.9:(Math.random()-.5)*1.1,roamZ:u==="attacker"?(Math.random()-.5)*1.4:(Math.random()-.5)*.8,laneBias:N*.34+(Math.random()-.5)*.24,pressBias:u==="attacker"?.86+Math.random()*.48:u==="defender"?.72+Math.random()*.3:.58+Math.random()*.2,speedBias:u==="attacker"?.95+Math.random()*.24:u==="defender"?.88+Math.random()*.2:.82+Math.random()*.16,tempoPhase:Math.random()*Math.PI*2,tempoRate:.85+Math.random()*.65,tempoJitter:.92+Math.random()*.2,burstTimer:Math.random()*.35,burstCooldown:.45+Math.random()*1.25,burstBoost:u==="attacker"?.18+Math.random()*.08:u==="defender"?.12+Math.random()*.08:.06+Math.random()*.05,sprintBlend:0,breakRunBias:u==="attacker"?(V==="runner"?1.25:V==="poacher"?1.12:.94)+Math.random()*.18:0,goalRunTimer:0,goalRunCooldown:.8+Math.random()*2.2,goalRunTargetX:N,goalRunTargetZ:O,saveCooldown:0,saveLift:0,diveDir:0,diveBlend:0,nextShuffle:.55+Math.random()*1.25})}const x=[2974645,15896365,3187823,9391055,13582159],v=[],g=kr(0);for(let b=0;b<d_;b+=1){const C=Js(Ks({shirt:x[b%x.length],shorts:2106417,shoe:1381911})),U=0,M=(yc+b*6.6)%g,_=jr(U,M),u=2.02+b*.13+Math.random()*.16;C.root.position.set(_.x,C.baseY,_.z),C.root.rotation.y=Math.atan2(-_.dirX,-_.dirZ),n.add(C.root),v.push({runner:C,laneIndex:U,targetLaneIndex:U,dir:-1,progress:M,speed:u,currentSpeed:u,speedPhase:Math.random()*Math.PI*2,cycle:Math.random()*Math.PI*2,jumpY:0,jumpVel:0,jumpCooldown:.18+Math.random()*.22})}const p=[],A=0,T=kr(A),y=T/Math.max(1,Ac),L=[];for(let b=0;b<Ac;b+=1)L.push((yc+y*(b+.5))%T);for(let b=0;b<L.length;b+=1){const C=L[b],U=jr(A,C),M=new te;gt(M,new Pe(.06,.34,.06),15987958,new E(-.31,.17,0)),gt(M,new Pe(.06,.34,.06),15987958,new E(.31,.17,0)),gt(M,new Pe(.74,.065,.065),13582159,new E(0,.335,0)),M.position.set(U.x,.015,U.z),M.rotation.y=Math.atan2(U.dirX,U.dirZ),M.scale.setScalar(Ai),n.add(M);const _={type:"obb",x:M.position.x,z:M.position.z,halfX:.46*Ai,halfZ:.12*Ai,yaw:M.rotation.y};i.push(_),p.push({laneIndex:A,progress:C,mesh:M,collider:_,fallen:!1,fallProgress:0,resetTimer:0,tipDir:0,baseY:.015,baseHalfX:.46*Ai,baseHalfZ:.12*Ai})}return{group:n,ball:t,ballVel:new E(0,0,0),goals:e,coach:d,players:h,trackRunners:v,hurdles:p,colliders:i,redScore:0,blueScore:0,phase:0,attackingTeam:0,ballHolder:null,lastControllingTeam:0,counterTeam:0,counterTimer:0,counterRunner:null,deliveryType:null,deliveryTeam:0,deliveryTimer:0,deliverySource:null,deliveryTarget:null,stallTeam:0,stallTimer:0,lastTouchTeam:0,lastTouchPlayer:null,sameTeamTouchCount:0,celebration:null,trackFinishX:Hh,track100StartX:h_}}function ar(n){Fc&&(Fc.textContent=`${n.redScore} : ${n.blueScore}`,An.className="scoreboard-attack",n.attackingTeam===1?(An.textContent=`${Ic.red} ründab`,An.classList.add("scoreboard-attack-red")):n.attackingTeam===-1?(An.textContent=`${Ic.blue} ründab`,An.classList.add("scoreboard-attack-blue")):An.textContent="Rünnak: lahtine pall"),Hn&&(Hn.className="scoreboard-player",n.ballHolder?(Hn.textContent=`Pall: ${n.ballHolder.shirtNumber} - ${n.ballHolder.displayName}`,Hn.classList.add(n.ballHolder.team===1?"scoreboard-player-red":"scoreboard-player-blue")):Hn.textContent="Pall: lahtine")}function Jh(n){n.ball.position.set(0,di,0),n.ballVel.set(0,0,0),n.deliveryType=null,n.deliveryTeam=0,n.deliveryTimer=0,n.deliverySource=null,n.deliveryTarget=null,n.stallTeam=0,n.stallTimer=0,n.lastTouchTeam=0,n.lastTouchPlayer=null,n.sameTeamTouchCount=0,n.ballHolder=null}function $h(n){const t=Math.abs(Math.trunc(n||0)),e=t%100;if(e>=11&&e<=13)return`${t}th`;const i=t%10;return i===1?`${t}st`:i===2?`${t}nd`:i===3?`${t}rd`:`${t}th`}function jh(n,t=null,e=0){if(!n){ge.style.display="none",ge.style.opacity="0",ge.style.transform="translate(-50%, -50%) scale(0.82)";return}ge.style.display="block",Xn.textContent="GOAL",Xn.style.color=e===1?"#fecaca":e===-1?"#bfdbfe":"#f8fafc",fi.textContent=t?`${t.shirtNumber} - ${t.displayName} | ${$h(t.goalsScored??1)} goal`:"SCORER UNKNOWN",fi.style.color=e===1?"#fca5a5":e===-1?"#93c5fd":"#dbeafe"}function I_(n){Jh(n),n.attackingTeam=0,n.lastControllingTeam=0,n.counterTeam=0,n.counterTimer=0,n.counterRunner=null,n.celebration=null,n.coach&&(n.coach.lastBallHolder=null,n.coach.lastControllingTeam=0);for(let t=0;t<n.players.length;t+=1){const e=n.players[t];e.runner.root.position.x=e.home.x,e.runner.root.position.z=e.home.z,e.runner.root.rotation.y=e.homeYaw??(e.team===1?0:Math.PI),e.vx=0,e.vz=0,e.kickBlend=0,e.kickCooldown=.28+Math.random()*.45,e.sprintBlend=0,e.burstTimer=0,e.burstCooldown=.55+Math.random()*1.2,e.goalRunTimer=0,e.goalRunCooldown=.8+Math.random()*2.2,e.goalRunTargetX=e.home.x,e.goalRunTargetZ=e.home.z,e.saveCooldown=0,e.saveLift=0,e.diveDir=0,e.diveBlend=0,e.roamX=e.role==="attacker"?(Math.random()-.5)*1.9:(Math.random()-.5)*1.1,e.roamZ=e.role==="attacker"?(Math.random()-.5)*1.4:(Math.random()-.5)*.8}jh(!1),ar(n)}function U_(n,t,e){const i=n.ball.position.x,r=n.ball.position.z;Jh(n),n.ball.position.set(i,di,r);const o=e??n.players.find(m=>m.team===t&&m.role==="attacker")??n.players.find(m=>m.team===t)??null,s=o?.runner.root.position.x??0,a=o?.runner.root.position.z??t*(Xt*.34),l=s>=0?1:-1,c=Math.sign(a||(Math.random()<.5?-1:1)),d=l*(Zt-1.05),h=d-l*(2.35+Math.random()*.35),f=P.clamp(a+c*(2.1+Math.random()*2.4),-Xt+1.25,Xt-1.25);n.attackingTeam=0,n.celebration={active:!0,timer:Ec,duration:Ec,team:t,scorer:o,spotX:d,spotZ:f,inwardX:h,sideSign:l,ballX:i,ballZ:r,pulse:Math.random()*Math.PI*2,waveSeed:Math.random()*Math.PI*2,orbitSeed:Math.random()*Math.PI*2},jh(!0,o,t),ar(n),An&&(An.className="scoreboard-attack",An.textContent="GOAL CELEBRATION",An.classList.add(t===1?"scoreboard-attack-red":"scoreboard-attack-blue")),Hn&&(Hn.className="scoreboard-player",Hn.textContent=o?`Scorer: ${o.shirtNumber} - ${o.displayName} (${$h(o.goalsScored??1)} goal)`:"Scorer: unknown",Hn.classList.add(t===1?"scoreboard-player-red":"scoreboard-player-blue"))}function N_(n,t){const e=n.celebration;if(!e?.active)return!1;e.timer=Math.max(0,e.timer-t),e.pulse+=t*8.2;const i=e.duration-e.timer,r=u_-i;if(r>0){const d=P.clamp(i/.9,0,1),h=P.clamp(r/.7,0,1);ge.style.display="block",ge.style.opacity=String(Math.min(d*1.15,1)*Math.min(h*1.1,1)),ge.style.transform=`translate(-50%, -50%) scale(${.82+d*.24-(1-h)*.08})`}else ge.style.opacity="0",ge.style.display="none";n.ball.position.set(e.ballX,di,e.ballZ),n.ballVel.set(0,0,0);const o=e.scorer,s=n.players.filter(d=>d.team===e.team&&d!==o),a=e.sideSign||Math.sign(e.spotX||1)||1,l=P.clamp(i/2.8,0,1),c=P.clamp((i-1.4)/2.4,0,1);for(let d=0;d<n.players.length;d+=1){const h=n.players[d];let f=h.home.x,m=h.home.z,x=0,v=h.team===e.team?1.8:1.2,g=e.inwardX??e.spotX-a*2.2,p=e.spotZ,A={kickAmount:h.kickBlend??0,kickSide:h.kickSide??1,sprintAmount:h.team===e.team?.58:.18};if(h===o){const u=Math.sin(e.pulse*.48+e.waveSeed)*.34;f=P.lerp(h.runner.root.position.x,e.spotX,l<1?.18:.1),m=P.lerp(e.spotZ+u,e.spotZ,l<1?.18:.06),l>=.999&&(f=e.spotX,m=e.spotZ+u,x=Math.max(0,Math.sin(e.pulse+.3))*.58),v=2.85-c*.7,g=e.inwardX??e.spotX-a*2.2,p=e.spotZ+Math.sin(e.pulse*.24)*.4,A={...A,type:"celebration",amount:.9,side:-a,bounce:P.clamp(x/.58,0,1),sprintAmount:l<.999?1:.45}}else if(h.team===e.team){const u=Math.max(0,s.indexOf(h)),N=Math.max(1,s.length-1),O=a>0?Math.PI:0,k=N>0?u/N-.5:0,H=O+k*Math.PI*.9+Math.sin(e.pulse*.12+u*.35)*.08,G=1.9+u%3*.28+(h.role==="keeper"?.48:0);f=e.spotX+Math.cos(H)*G,m=e.spotZ+Math.sin(H)*G*.74,f=P.lerp(e.inwardX??f,f,c);const Z=Math.hypot(f-h.runner.root.position.x,m-h.runner.root.position.z);v=h.role==="keeper"?1.9:2.15,Z<.95&&c>.6&&(x=Math.max(0,Math.sin(e.pulse+u*.72+e.waveSeed))*(.24+u%2*.06)),g=e.spotX-a*.35,p=e.spotZ,A={...A,type:"celebration",amount:c>.68&&Z<1.08?.62:.2,side:u%2===0?-a:a,bounce:P.clamp(x/.32,0,1),sprintAmount:Z>1.2?.88:.3}}else{const u=P.clamp(i/4.2,0,1);f=P.lerp(h.runner.root.position.x,h.home.x*.82,u),m=P.lerp(h.runner.root.position.z,h.home.z*.72,u),v=h.role==="keeper"?1.2:1.45,g=e.spotX,p=e.spotZ,A={...A,sprintAmount:.08}}const T=f-h.runner.root.position.x,y=m-h.runner.root.position.z,L=Math.hypot(T,y),b=L>.08?v:0,C=L>.001?T/L*b:0,U=L>.001?y/L*b:0,M=h===o?8.4:h.team===e.team?7.2:5.2;h.vx=P.damp(h.vx,C,M,t),h.vz=P.damp(h.vz,U,M,t),h.runner.root.position.x+=h.vx*t,h.runner.root.position.z+=h.vz*t,h.runner.root.position.x=P.clamp(h.runner.root.position.x,-Zt+.45,Zt-.45),h.runner.root.position.z=P.clamp(h.runner.root.position.z,-Xt+.45,Xt-.45);const _=Math.hypot(h.vx,h.vz);_>.06&&L>.15?h.runner.root.rotation.y=Math.atan2(h.vx,h.vz):h.runner.root.rotation.y=Math.atan2(g-h.runner.root.position.x,p-h.runner.root.position.z),h.kickBlend=Math.max(0,(h.kickBlend??0)-t*6.4),h.cycle+=t*(5.2+_*2.9+x*3.4+(A.type==="celebration"?A.amount*1.4:0)),Wo(h.runner,_,h.cycle,x,A)}return e.timer<=.001&&I_(n),!0}function Rr(n,t,e=null){n.lastTouchTeam===t?n.sameTeamTouchCount=Math.min(9,n.sameTeamTouchCount+1):(n.lastTouchTeam=t,n.sameTeamTouchCount=1),n.lastTouchPlayer=e}function Cr(n,t,e=1){if(!n?.runner||!t)return;const i=n.runner.root.worldToLocal(t.position.clone());n.kickSide=i.x>=0?1:-1,n.kickBlend=Math.max(n.kickBlend??0,P.clamp(e,.45,1.15))}function Pr(n,t){if(!n?.runner||!t||n.runner.runnerStyle!=="juku")return;const i=(n.kickSide===0?1:Math.sign(n.kickSide??1))>0?n.runner.leftLegRig?.footPivot:n.runner.rightLegRig?.footPivot;if(!i)return;i.updateWorldMatrix(!0,!1);const r=i.localToWorld(new E(0,-.035,.265));t.position.lerp(r,.7),t.position.y=di}function F_(n,t,e){let i=null,r=-1/0,o=0,s=-1/0,a=null,l=-1/0,c=0,d=-1/0,h=null,f=-1/0,m=0;const x=-n.runner.root.position.z*n.team,v=P.clamp((x-(Xt-7.2))/3.4,0,1.55);for(let L=0;L<t.length;L+=1){const b=t[L];if(b===n||b.role==="keeper")continue;const C=P.clamp((b.goalRunTimer??0)/1.8,0,1.3),U=.42+C*.24,M=b.goalRunTimer>0?b.goalRunTargetX??b.runner.root.position.x:b.runner.root.position.x,_=b.goalRunTimer>0?b.goalRunTargetZ??b.runner.root.position.z:b.runner.root.position.z,u=b.runner.root.position.x+b.vx*U+(M-b.runner.root.position.x)*C*.52,N=b.runner.root.position.z+b.vz*U+(_-b.runner.root.position.z)*C*.58,O=u-n.runner.root.position.x,k=N-n.runner.root.position.z,H=Math.hypot(O,k);if(H<1.6||H>10.8)continue;const G=k*n.team,Z=n.runner.root.position.z*n.team,V=N*n.team,et=V-Z,rt=P.clamp((Z-1.6)/5.8,0,1.35);if(v>.32&&G<.35&&H<4.8)continue;let ht=99,Rt=0,Gt=0;for(let xt=0;xt<e.length;xt+=1){const ot=e[xt],pt=u-ot.runner.root.position.x,Ot=N-ot.runner.root.position.z;ht=Math.min(ht,Math.hypot(pt,Ot));const bt=ot.runner.root.position.x-n.runner.root.position.x,dt=ot.runner.root.position.z-n.runner.root.position.z,Wt=P.clamp((bt*O+dt*k)/Math.max(.001,H*H),0,1),I=n.runner.root.position.x+O*Wt,K=n.runner.root.position.z+k*Wt,j=Math.hypot(ot.runner.root.position.x-I,ot.runner.root.position.z-K);j<1.15&&(Rt+=(1.15-j)*(1.18-Wt*.4)),Wt>.12&&Wt<.92&&j<.82&&(Gt+=(.82-j)*1.6)}const Yt=P.clamp((ht-.9)/3.3,0,1.35),Dt=P.clamp((H-2.4)/5.8,0,1.55),$=P.clamp(Math.abs(O)/5.4,0,1.1),nt=P.clamp(G/5.8,-.2,1.4),ut=b.role==="attacker"?.9:b.role==="defender"?.38:0,Tt=b.attackerProfile==="runner"?.34:b.attackerProfile==="poacher"?.22:b.attackerProfile==="playmaker"?-.08:0,_t=b.counterRunBoost??0,jt=b.attackLane==="farPost"?1.12:b.attackLane==="poach"?1.04:b.attackLane==="boxEdge"?.76:b.attackLane==="overlap"?.92:b.attackLane==="underlap"?.72:b.attackLane==="link"?.34:b.attackLane==="press"?.18:0,ae=b.attackLane==="overlap"?$*1.2+Yt*.34:0,F=b.attackLane==="underlap"?nt*1.05+Yt*.2:0,pe=b.attackLane==="poach"?nt*.4+Yt*.28:0,Ut=b.attackLane==="farPost"?$*.52+Yt*.36:0,Nt=b.attackLane==="boxEdge"?Yt*.28+Dt*.22:0,Et=rt*P.clamp((V-Z+.45)/4.2,-.25,1.25),de=rt*P.clamp((V-(Xt-5.6))/3.4,0,1.15),yt=P.clamp((et-.15)/3.2,-.2,1.45),Vt=P.clamp((V-(Xt-6.6))/3.2,0,1.3),ye=b.goalRunTimer>0?(.95+Math.max(0,nt)*.85+Yt*.55+Vt*.6)*P.clamp(b.breakRunBias??1,.8,1.6):0,qt=b.goalRunTimer>0?P.clamp((.95-Rt)/.95,0,1.1)+P.clamp((.72-Gt)/.72,0,.9):0,D=b.role==="attacker"?yt*1.25+Vt*1.15+Math.max(0,nt)*.55:yt*.36,S=rt*P.clamp((.7-G)/1.7,0,1.25)*P.clamp((5.4-H)/3.6,0,1.12),W=rt*P.clamp((-G+.25)/2.8,0,1.3),Q=b.role==="attacker"?rt*P.clamp((.45-et)/1.6,0,1.3):0,it=v*P.clamp(G/4.9,-.15,1.35),J=v*P.clamp((H-3.5)/4.6,0,1.25),wt=Yt*2.7+Dt*2.15+nt*2.25+$*.75+ut+Tt+_t+jt+ae+F+pe+Ut+Nt+Et*1.95+de*1.55+D*1.9+ye*1.8+qt*1.25+it*2.45+J*1.85-S*2.2-W*2.6-Q*1.8-Rt*(1.65+v*.12)-Gt*(1.4+v*.08);if(wt>r&&(r=wt,i=b,o=H,s=et),G>.55&&et>.35){const xt=wt+yt*1.4+Vt*1.2+(b.role==="attacker"?1.35:.35);xt>l&&(l=xt,a=b,c=H,d=et)}if(b.role==="attacker"&&G>.8&&et>.65&&Yt>.2-C*.08&&ht>1.15-C*.14&&Rt<.45+C*.18&&Gt<.35+C*.16){const xt=wt+yt*1.8+Vt*1.5+Yt*.9+C*1.8;xt>f&&(f=xt,h=b,m=H)}}const g=h&&(!i||i===h||i.role!=="attacker"||s<.55||f>r-.8),p=!g&&a&&(!i||i.role!=="attacker"||s<.3||d>s+.25||l>r-.45),A=g?h:p?a:i,T=g?m:p?c:o,y=g?f:p?l:r;return y>1?{player:A,dist:T,score:y,forward:A?(A.runner.root.position.z-n.runner.root.position.z)*n.team:0,targetDepth:A?A.runner.root.position.z*n.team:0,goalGain:A?A.runner.root.position.z*n.team-n.runner.root.position.z*n.team:0,progressive:A?(A.runner.root.position.z-n.runner.root.position.z)*n.team>.55&&A.runner.root.position.z*n.team-n.runner.root.position.z*n.team>.35:!1,forcedForward:A?A===h:!1,throughRun:A?A.role==="attacker"&&(A.goalRunTimer??0)>.18:!1,leadTime:A?.42+P.clamp((A.goalRunTimer??0)/1.8,0,1.3)*.24:.42}:null}function O_(n,t,e,i){let r=null,o=-1/0,s=0;for(let a=0;a<t.length;a+=1){const l=t[a];if(l===n||l.role==="keeper")continue;const c=.3,d=l.runner.root.position.x+l.vx*c,h=l.runner.root.position.z+l.vz*c+n.team*.12,f=d-n.runner.root.position.x,m=h-n.runner.root.position.z,x=Math.hypot(f,m);if(x<1.4||x>9.2)continue;const v=(i-h)*n.team,g=P.clamp((4.8-v)/3.6,-.2,1.45),p=l.attackLane==="farPost"?1.5:l.attackLane==="poach"?1.34:l.attackLane==="boxEdge"?.98:l.role==="attacker"?1.15:l.attackLane==="underlap"?.74:l.attackLane==="link"?.42:.18,A=l.attackerProfile==="poacher"?.46:l.attackerProfile==="runner"?.22:l.attackerProfile==="playmaker"?-.12:0,T=P.clamp((-Math.sign(n.runner.root.position.x||1)*d+.8)/2.8,0,1.2),y=P.clamp((3.6-Math.abs(d))/3.2,0,1.1);let L=99,b=0;for(let M=0;M<e.length;M+=1){const _=e[M],u=Math.hypot(d-_.runner.root.position.x,h-_.runner.root.position.z);L=Math.min(L,u),u<1.3&&(b+=(1.3-u)*1.25)}const C=P.clamp((L-.8)/2.8,0,1.35),U=g*2.55+T*1.45+y*.9+C*2.1+p+A-b*1.4;U>o&&(o=U,r=l,s=x)}return o>1.25?{player:r,dist:s,score:o}:null}function B_(n,t,e){const i=-n.runner.root.position.z*n.team,r=i>Xt-7.4?5.6:4.4;let o=0,s=0,a=0;for(let v=0;v<e.length;v+=1){const g=e[v];if(g.role==="keeper")continue;const p=g.runner.root.position.x-n.runner.root.position.x,A=(g.runner.root.position.z-n.runner.root.position.z)*n.team,T=Math.hypot(p,A);if(A<-1.2||A>r||Math.abs(p)>Zt*.72)continue;const y=(1.18-P.clamp(T/(r+.8),0,1.18))*(1.08-P.clamp(Math.abs(p)/(Zt*.68),0,.82));Math.abs(p)<.72?a+=y*1.18:p<0?o+=y:s+=y}const l=s>o+.22?1:o>s+.22?-1:0,c=l!==0?-l:a>.55?Math.sign(n.runner.root.position.x||n.laneBias||1):Math.sign(n.laneBias||n.runner.root.position.x||1);let d=null,h=-1/0;for(let v=0;v<t.length;v+=1){const g=t[v];if(g===n||g.role==="keeper")continue;const p=.58,A=g.runner.root.position.x+g.vx*p,T=g.runner.root.position.z+g.vz*p+n.team*.26,y=A-n.runner.root.position.x,L=T-n.runner.root.position.z,b=Math.hypot(y,L),C=L*n.team;if(C<1.2||b<3.4||b>15.2)continue;let U=99;for(let H=0;H<e.length;H+=1){const G=e[H];G.role!=="keeper"&&(U=Math.min(U,Math.hypot(A-G.runner.root.position.x,T-G.runner.root.position.z)))}const M=P.clamp((U-1)/3.8,0,1.25),_=P.clamp(C/7.2,0,1.45),u=P.clamp((b-3.8)/6.6,0,1.3),N=P.clamp((A*c+Zt*.24)/(Zt*1.04),0,1.25),O=g.role==="attacker"?.72:g.attackLane==="overlap"||g.attackLane==="farPost"?.56:.28,k=M*2.2+_*2.65+u*1.55+N*1.4+O;k>h&&(h=k,d={type:"player",player:g,x:A,z:T,dist:b,score:k})}if(d&&d.score>2.55)return{...d,pressureSide:l,power:3.55+Math.min(2.6,d.dist*.24)};const f=P.clamp(c*(Zt-.85)+(Math.random()-.5)*.7,-Zt+.7,Zt-.7),m=P.clamp(n.runner.root.position.z+n.team*(7.1+Math.min(2.2,i*.08)+a*.7),-Xt+.7,Xt-.45),x=Math.hypot(f-n.runner.root.position.x,m-n.runner.root.position.z);return{type:"channel",x:f,z:m,dist:x,score:1.8+a,pressureSide:l,power:3.95+Math.min(1.9,x*.16)}}function z_(n){const t=[];for(let r=0;r<n.players.length;r+=1){const o=n.players[r];t.push({kind:"football",ref:o,radius:Wa,x:o.runner.root.position.x,z:o.runner.root.position.z})}for(let r=0;r<n.trackRunners.length;r+=1){const o=n.trackRunners[r];t.push({kind:"track",ref:o,radius:l_,x:o.runner.root.position.x,z:o.runner.root.position.z})}n.coach&&t.push({kind:"coach",ref:n.coach,radius:c_,x:n.coach.runner.root.position.x,z:n.coach.runner.root.position.z}),t.push({kind:"juku",radius:Go,x:w.x,z:w.z});const e=r=>{r.x=P.clamp(r.x,-Zt+.4,Zt-.4),r.z=P.clamp(r.z,-Xt+.4,Xt-.4)},i=r=>{if(r.kind==="football"){e(r);return}if(r.kind==="track"){const s=jr(r.ref.laneIndex,r.ref.progress);r.x=s.x,r.z=s.z;return}if(r.kind==="coach"){r.x=P.clamp(r.x,-No,No),r.z=P.clamp(r.z,-No,No);return}const o=tu(r.x,r.z);r.x=o.x,r.z=o.z};for(let r=0;r<4;r+=1){let o=!1;for(let s=0;s<t.length;s+=1){const a=t[s];for(let l=s+1;l<t.length;l+=1){const c=t[l],d=c.x-a.x,h=c.z-a.z,f=a.radius+c.radius,m=d*d+h*h;if(m>=f*f)continue;const x=Math.sqrt(m),v=x>1e-4?d/x:1,g=x>1e-4?h/x:0,A=(f-x)*.5;a.x-=v*A,a.z-=g*A,c.x+=v*A,c.z+=g*A,o=!0}}for(let s=0;s<t.length;s+=1)i(t[s]);if(!o)break}for(let r=0;r<t.length;r+=1){const o=t[r];if(o.kind==="football"){o.ref.runner.root.position.x=o.x,o.ref.runner.root.position.z=o.z;continue}if(o.kind==="track"){o.ref.runner.root.position.x=o.x,o.ref.runner.root.position.z=o.z;const s=jr(o.ref.laneIndex,o.ref.progress),a=o.ref.dir??1;o.ref.runner.root.rotation.y=Math.atan2(s.dirX*a,s.dirZ*a);continue}if(o.kind==="coach"){o.ref.runner.root.position.x=o.x,o.ref.runner.root.position.z=o.z;continue}w.x=o.x,w.z=o.z}}function k_(n,t=1.15){const e=Zt+t,i=Xt+t,r=e*2,o=i*2,s=r*2+o*2;let a=(n%1+1)%1*s;return a<o?{x:e,z:-i+a,dirX:0,dirZ:1}:(a-=o,a<r?{x:e-a,z:i,dirX:-1,dirZ:0}:(a-=r,a<o?{x:-e,z:i-a,dirX:0,dirZ:-1}:(a-=o,{x:-e+a,z:-i,dirX:1,dirZ:0})))}function Qh(n,t,e=1.15){const i=Zt+e,r=Xt+e,o=i*2,s=r*2,a=o*2+s*2,l=[{x:i,z:P.clamp(t,-r,r),d:P.clamp(t,-r,r)+r},{x:P.clamp(n,-i,i),z:r,d:s+(i-P.clamp(n,-i,i))},{x:-i,z:P.clamp(t,-r,r),d:s+o+(r-P.clamp(t,-r,r))},{x:P.clamp(n,-i,i),z:-r,d:s+o+s+(P.clamp(n,-i,i)+i)}];let c=l[0],d=1/0;for(let h=0;h<l.length;h+=1){const f=l[h],m=(n-f.x)**2+(t-f.z)**2;m<d&&(c=f,d=m)}return c.d/a}function H_(n,t){n.phase+=t;const e=ce.getWorldPosition(new E);if(n.coach){n.coach.whistleTimer=Math.max(0,n.coach.whistleTimer-t),n.coach.cardTimer=Math.max(0,n.coach.cardTimer-t),n.coach.cardCooldown=Math.max(0,n.coach.cardCooldown-t);const _=Qh(n.ball.position.x,n.ball.position.z,n.coach.perimeterOffset);Number.isFinite(n.coach.perimeterT)||(n.coach.perimeterT=_);let u=_-n.coach.perimeterT;u>.5&&(u-=1),u<-.5&&(u+=1);const N=4*(Zt+n.coach.perimeterOffset)+4*(Xt+n.coach.perimeterOffset),O=Math.abs(u)*N,k=Math.min(O,t*4.4),H=t>0?k/t:0;O>1e-4&&(n.coach.perimeterT=((n.coach.perimeterT+k/N*Math.sign(u))%1+1)%1);const G=k_(n.coach.perimeterT,n.coach.perimeterOffset);n.coach.runner.root.position.x=G.x,n.coach.runner.root.position.z=G.z,n.coach.runner.root.rotation.y=Math.atan2(G.dirX,G.dirZ)+Math.PI;const Z=n.ball.position.x-n.coach.runner.root.position.x,V=n.ball.position.z-n.coach.runner.root.position.z;n.coach.cycle+=t*(4+H*1.85),Wo(n.coach.runner,H,n.coach.cycle,0),n.coach.runner.leftArm.rotation.z*=.7,n.coach.runner.rightArm.rotation.z*=.7,n.coach.runner.torsoPivot.rotation.z*=.55;const et=P.clamp(n.coach.whistleTimer/.68,0,1),rt=P.clamp(n.coach.cardTimer/1.15,0,1);if(et>.001&&(n.coach.runner.leftArm.rotation.x=P.lerp(n.coach.runner.leftArm.rotation.x,-2.35,et),n.coach.runner.leftArm.rotation.z=P.lerp(n.coach.runner.leftArm.rotation.z,.28,et),n.coach.runner.leftArm.rotation.y=P.lerp(n.coach.runner.leftArm.rotation.y,.24,et),n.coach.runner.head.rotation.x=P.lerp(n.coach.runner.head.rotation.x,-.16,et*.8),n.coach.runner.head.rotation.y+=P.clamp(Z*.018,-.08,.08)*et,n.coach.runner.torsoPivot.rotation.x-=.06*et),rt>.001&&(n.coach.runner.rightArm.rotation.x=P.lerp(n.coach.runner.rightArm.rotation.x,-3.02,rt),n.coach.runner.rightArm.rotation.z=P.lerp(n.coach.runner.rightArm.rotation.z,-.08,rt),n.coach.runner.rightArm.rotation.y=P.lerp(n.coach.runner.rightArm.rotation.y,-.04,rt),n.coach.runner.torsoPivot.rotation.z+=.08*rt,n.coach.runner.head.rotation.x=Math.min(n.coach.runner.head.rotation.x,-.06*rt)),n.coach.runner.head.rotation.y=P.clamp(-Z*.045+n.coach.runner.head.rotation.y,-.28,.28),n.coach.runner.head.rotation.x=P.clamp(n.coach.runner.head.rotation.x+H*.01-V*.0035,-.2,.08),n.coach.yellowCard){const ht=n.coach.cardColor==="yellow";n.coach.yellowCard.visible=ht&&rt>.02,n.coach.yellowCard.material.opacity=ht?.92*rt:0}if(n.coach.redCard){const ht=n.coach.cardColor==="red";n.coach.redCard.visible=ht&&rt>.02,n.coach.redCard.material.opacity=ht?.92*rt:0}if(n.coach.label){const ht=e.distanceTo(n.coach.runner.root.position);n.coach.label.material.opacity=P.clamp((32-ht)/26,.18,.52)}}const i=(_,u)=>{_.fallen=!0,_.resetTimer=Cc,_.fallProgress=Math.max(_.fallProgress??0,.02),_.tipDir=u,_.collider&&(_.collider.halfX=.08,_.collider.halfZ=.08)};n.hurdles.forEach(_=>{_.fallen?(_.resetTimer=Math.max(0,(_.resetTimer??Cc)-t),_.resetTimer<=0&&(_.fallen=!1)):Math.random()<t*x_&&i(_,Math.random()<.5?-1:1);const u=_.fallen?Rc:-Rc*1.2;_.fallProgress=P.clamp((_.fallProgress??0)+t*u,0,1);const N=_.fallProgress>0?1-Math.pow(1-_.fallProgress,3):0;_.mesh.rotation.x=_.tipDir*N*P.degToRad(84),_.mesh.position.y=(_.baseY??.015)-N*.03,_.collider&&(_.collider.halfX=P.lerp(_.baseHalfX??.46*Ai,.12,N),_.collider.halfZ=P.lerp(_.baseHalfZ??.12*Ai,.34,N))});const r=(_,u,N,O)=>O>0?((u-_)%N+N)%N:((_-u)%N+N)%N,o=(_,u,N,O)=>{const k=_.dir??1,H=kr(u);for(let G=0;G<n.trackRunners.length;G+=1){const Z=n.trackRunners[G];if(Z===_)continue;const V=Z.targetLaneIndex??Z.laneIndex;if(Math.abs(Z.laneIndex-u)>.55&&Math.abs(V-u)>.55)continue;const et=r(_.progress,Z.progress,H,k),rt=H-et;if(et<N||rt<O)return!1}return!0};if(n.trackRunners.forEach(_=>{const u=_.dir??1,N=_.laneIndex??0,O=_.speedPhase??0,k=1+Math.sin(_.cycle*.11+O)*.05+Math.sin(_.cycle*.047+O*1.7)*.025,H=_.speed*k;_.currentSpeed=H,Number.isFinite(_.targetLaneIndex)||(_.targetLaneIndex=Math.round(N));const G=kr(N);let Z=null,V=1/0;for(let ut=0;ut<n.trackRunners.length;ut+=1){const Tt=n.trackRunners[ut];if(Tt===_||Math.abs(Tt.laneIndex-N)>.42)continue;const _t=r(_.progress,Tt.progress,G,u);_t>.001&&_t<V&&(V=_t,Z=Tt)}const et=Z?Z.currentSpeed??Z.speed??0:0,rt=!!Z&&V<v_&&H>et+.06;if(rt&&(_.targetLaneIndex??0)<Lc){for(let ut=1;ut<=Lc;ut+=1)if(o(_,ut,Xs,Pc)){_.targetLaneIndex=ut;break}}else!rt&&(_.targetLaneIndex??0)>0&&(!Z||V>Xs*.9)&&o(_,0,Xs*.85,Pc)&&(_.targetLaneIndex=0);_.laneIndex=P.damp(N,_.targetLaneIndex??0,M_,t),Math.abs(_.laneIndex-(_.targetLaneIndex??0))<.02&&(_.laneIndex=_.targetLaneIndex??0);let ht=H;(_.targetLaneIndex??0)===0&&V<1.35&&(ht*=P.clamp(V/1.35,.72,1));const Rt=kr(_.laneIndex);_.progress=(_.progress+u*t*ht*3.35+Rt)%Rt;const Gt=jr(_.laneIndex,_.progress);_.runner.root.position.x=Gt.x,_.runner.root.position.z=Gt.z,_.runner.root.rotation.y=Math.atan2(Gt.dirX*u,Gt.dirZ*u),_.jumpCooldown=Math.max(0,_.jumpCooldown-t);let Yt=null,Dt=1/0,$=null,nt=1/0;for(let ut=0;ut<n.hurdles.length;ut+=1){const Tt=n.hurdles[ut];if(Math.abs(Tt.laneIndex-_.laneIndex)>.35||Tt.fallen)continue;const _t=r(_.progress,Tt.progress,Rt,u);_t>.001&&_t<Dt&&(Dt=_t,Yt=Tt);const jt=Math.min(_t,Rt-_t);jt<nt&&(nt=jt,$=Tt)}_.jumpY<=1e-4&&_.jumpCooldown<=0&&_.laneIndex<.35&&Yt&&Dt<g_&&(_.jumpVel=f_+Math.random()*.18,_.jumpCooldown=.72+Math.random()*.14),(_.jumpY>0||_.jumpVel>0)&&(_.jumpVel-=8.8*t,_.jumpY+=_.jumpVel*t,_.jumpY<=0&&(_.jumpY=0,_.jumpVel=0)),$&&nt<__&&_.jumpY+Math.max(0,_.jumpVel)*.045<p_&&(i($,u>0?-1:1),_.jumpVel=Math.max(_.jumpVel,m_),_.jumpCooldown=Math.max(_.jumpCooldown,.48)),_.cycle+=t*(5.8+ht*2.35),Wo(_.runner,ht*.86,_.cycle,_.jumpY)}),N_(n,t))return;n.ballVel.multiplyScalar(Math.pow(.985,t*60)),n.ball.position.x+=n.ballVel.x*t,n.ball.position.z+=n.ballVel.z*t;const s=Xt-.9,a=le*.5+di*.7,l=n.players.filter(_=>_.role==="keeper");for(let _=0;_<l.length;_+=1){const u=l[_],O=-u.team*s+u.team*.72;if(!(n.ballVel.z*u.team<-.35)||Math.abs(n.ball.position.x)>a+.82)continue;const H=Math.abs(n.ballVel.z)>.001?(O-n.ball.position.z)/n.ballVel.z:1/0,G=Number.isFinite(H)?n.ball.position.x+n.ballVel.x*P.clamp(H,0,.5):n.ball.position.x,Z=Math.hypot(n.ball.position.x-u.runner.root.position.x,n.ball.position.z-u.runner.root.position.z)<.92*wc,V=H>0&&H<.34&&Math.abs(G-u.runner.root.position.x)<.88*wc;if((Z||V)&&u.saveCooldown<=0){const et=P.clamp((n.ball.position.x-u.runner.root.position.x)*1.6+(Math.random()-.5)*.7,-2.4,2.4),rt=u.team*(2.8+Math.random()*.9),ht=Math.max(.001,Math.hypot(et,rt)),Rt=3.2+Math.min(1.35,n.ballVel.length()*.42);n.ball.position.z=O+u.team*.08,n.ballVel.x=et/ht*Rt,n.ballVel.z=rt/ht*Rt,u.saveCooldown=.82,u.diveDir=Math.sign(G-u.runner.root.position.x||n.ball.position.x-u.runner.root.position.x||1),u.diveBlend=1,u.saveLift=.24}}let c=0;if(Math.abs(n.ball.position.x)<=a&&(n.ball.position.z>=s?(n.redScore+=1,c=1):n.ball.position.z<=-s&&(n.blueScore+=1,c=-1)),c!==0){let _=n.lastTouchPlayer&&n.lastTouchPlayer.team===c?n.lastTouchPlayer:null;if(!_){let u=1/0;for(let N=0;N<n.players.length;N+=1){const O=n.players[N];if(O.team!==c)continue;const k=Math.hypot(n.ball.position.x-O.runner.root.position.x,n.ball.position.z-O.runner.root.position.z);k<u&&(u=k,_=O)}}_&&(_.goalsScored=(_.goalsScored??0)+1),ar(n),U_(n,c,_);return}const d=Zt-.24,h=Xt-.24;if(Math.abs(n.ball.position.x)>d){const _=Math.sign(n.ball.position.x||1);n.ball.position.x=_*d,n.ballVel.x*_>0&&(n.ballVel.x*=-.8)}if(Math.abs(n.ball.position.z)>h){const _=Math.sign(n.ball.position.z||1);n.ball.position.z=_*h,n.ballVel.z*_>0&&(n.ballVel.z*=-.8)}n.ball.position.y=di+Math.sin(n.phase*9.2)*Math.min(.02,n.ballVel.length()*.005);const f=n.players.filter(_=>_.team===1),m=n.players.filter(_=>_.team===-1),x={1:f,[-1]:m},v={1:null,[-1]:null},g={1:1/0,[-1]:1/0};let p=null,A=1/0;for(let _=0;_<n.players.length;_+=1){const u=n.players[_],N=Math.hypot(n.ball.position.x-u.runner.root.position.x,n.ball.position.z-u.runner.root.position.z);N<A&&(A=N,p=u),N<g[u.team]&&(g[u.team]=N,v[u.team]=u)}let T=0;g[1]+.18<g[-1]&&(T=1),g[-1]+.18<g[1]&&(T=-1);let y=T!==0&&v[T]&&g[T]<Ar+.22?v[T]:null;const L=n.deliveryType==="pass"&&n.deliveryTimer>0?n.deliveryTarget:null;if(L&&L!==n.deliverySource){const _=Math.hypot(n.ball.position.x-L.runner.root.position.x,n.ball.position.z-L.runner.root.position.z),u=g[-L.team];_<Ar+.44&&_<=u+.36&&(T=L.team,y=L)}!y&&p&&A<Ar+.12&&(T=p.team,y=p);const b=y??(p&&A<Ar+.12?p:null);if(y!==n.ballHolder&&(n.ballHolder=y,ar(n)),T!==n.attackingTeam&&(n.attackingTeam=T,ar(n)),n.coach){(y&&y!==n.coach.lastBallHolder||T!==0&&T!==n.coach.lastControllingTeam)&&(n.coach.whistleTimer=Math.max(n.coach.whistleTimer,.68)),n.coach.lastBallHolder=y,n.coach.lastControllingTeam=T;let _=0;for(let O=0;O<n.players.length;O+=1){const k=n.players[O];if(k.role==="keeper")continue;Math.hypot(n.ball.position.x-k.runner.root.position.x,n.ball.position.z-k.runner.root.position.z)<1.34&&(_+=1)}const u=Math.hypot(n.coach.runner.root.position.x-n.ball.position.x,n.coach.runner.root.position.z-n.ball.position.z);_>=4&&n.ballVel.length()<1.05&&u<5.4?n.coach.crowdTimer=Math.min(5.5,n.coach.crowdTimer+t):n.coach.crowdTimer=Math.max(0,n.coach.crowdTimer-t*1.7),n.coach.cardCooldown<=0&&n.coach.crowdTimer>2.2&&(n.coach.cardColor=n.coach.crowdTimer>3.8?"red":"yellow",n.coach.cardTimer=n.coach.cardColor==="red"?1.28:1.1,n.coach.whistleTimer=Math.max(n.coach.whistleTimer,.58),n.coach.cardCooldown=n.coach.cardColor==="red"?8.5:5.5,n.coach.crowdTimer=0)}const C=T!==0?-n.ball.position.z*T:0,U=T!==0?n.ballVel.z*T:0;if(T!==0&&C>Xt-6.4&&(n.ballVel.length()<1.55||U<.42)?(n.stallTeam!==T&&(n.stallTimer=0),n.stallTeam=T,n.stallTimer=Math.min(4.5,n.stallTimer+t)):(n.stallTimer=Math.max(0,n.stallTimer-t*(n.stallTeam===T?1.5:2.6)),n.stallTimer<=.001&&(n.stallTimer=0,n.stallTeam=0)),T!==n.lastControllingTeam){if(T!==0){const _=x[T].filter(O=>O.role==="attacker"&&O!==v[T]);let u=null,N=-1/0;for(let O=0;O<_.length;O+=1){const k=_[O];let H=99;for(let rt=0;rt<x[-T].length;rt+=1){const ht=x[-T][rt],Rt=Math.hypot(k.runner.root.position.x-ht.runner.root.position.x,k.runner.root.position.z-ht.runner.root.position.z);H=Math.min(H,Rt)}const G=Math.abs(k.home.x)*.42,Z=k.runner.root.position.z*T*.36,V=H*.9,et=G+Z+V;et>N&&(N=et,u=k)}n.counterTeam=T,n.counterTimer=u?3.2:0,n.counterRunner=u}else n.counterTeam=0,n.counterTimer=0,n.counterRunner=null;n.lastControllingTeam=T}n.counterTimer>0&&(n.counterTimer=Math.max(0,n.counterTimer-t),(n.counterTimer===0||n.counterTeam!==T)&&(n.counterTeam=0,n.counterRunner=null)),n.deliveryTimer>0&&(n.deliveryTimer=Math.max(0,n.deliveryTimer-t),(n.deliveryTimer===0||T!==0&&n.deliveryTeam!==T)&&(n.deliveryType=null,n.deliveryTeam=0,n.deliverySource=null,n.deliveryTarget=null));for(let _=0;_<n.players.length;_+=1)n.players[_].counterRunBoost=n.counterTeam!==0&&n.players[_]===n.counterRunner?1.35:0;for(let _=0;_<n.players.length;_+=1){const u=n.players[_],N=x[u.team],O=x[-u.team],k=N.filter(I=>I.role==="attacker"),H=N.filter(I=>I.role==="defender"),G=v[u.team],Z=u.role==="attacker"?Math.max(0,k.indexOf(u)):-1,V=u.role==="defender"?Math.max(0,H.indexOf(u)):-1,et=u.team*(Xt-.9),rt=-u.team*(Xt-.9),ht=n.ball.position.z*u.team,Rt=P.clamp((-n.ball.position.z*u.team+.4)/6.2,0,1),Gt=Math.abs(n.ball.position.x)<1.2?0:Math.sign(n.ball.position.x),Yt=n.counterTeam===u.team&&n.counterRunner===u&&n.counterTimer>0,Dt=u.attackerProfile??null,$=u.shotHunger??.75,nt=P.clamp((n.stallTimer-.35)/1.45,0,1),ut=n.stallTeam===u.team&&nt>0,Tt=n.stallTeam===-u.team&&nt>.32,_t=u.role==="defender"&&T===u.team&&(ut||(Math.abs(u.home.x)>.5?ht>-2.4||Yt:ht>.7||u===G||Yt)),jt=u.role==="attacker"&&T!==u.team&&Rt>.42&&!Tt,ae=u.role==="keeper"?"keeper":_t?"supportAttack":jt?"recoverDefence":u.role;if(u.attackLane="hold",u.kickCooldown=Math.max(0,u.kickCooldown-t),u.kickBlend=Math.max(0,(u.kickBlend??0)-t*6.4),u.burstTimer=Math.max(0,(u.burstTimer??0)-t),u.burstCooldown=Math.max(0,(u.burstCooldown??0)-t),u.goalRunTimer=Math.max(0,(u.goalRunTimer??0)-t),u.goalRunCooldown=Math.max(0,(u.goalRunCooldown??0)-t),u.nextShuffle-=t,u.nextShuffle<=0&&(u.nextShuffle=.55+Math.random()*1.45,u.roamX=P.clamp(u.roamX+(Math.random()-.5)*(ae==="attacker"||ae==="supportAttack"?.9:.5),-2.4,2.4),u.roamZ=P.clamp(u.roamZ+(Math.random()-.5)*(ae==="attacker"||ae==="supportAttack"?.72:.4),-1.6,1.6),u.pressBias=P.clamp(u.pressBias+(Math.random()-.5)*.18,ae==="attacker"?.78:.54,ae==="attacker"?1.42:1.2)),u.burstCooldown<=0){const I=u.role==="attacker"?.82:u.role==="defender"?.58:.28;Math.random()<I&&(u.burstTimer=.42+Math.random()*.82),u.burstCooldown=.8+Math.random()*1.8}const F=n.ball.position.x-u.runner.root.position.x,pe=n.ball.position.z-u.runner.root.position.z,Ut=Math.hypot(F,pe),Nt=n.deliveryType==="pass"&&n.deliveryTeam===u.team&&n.deliveryTimer>0&&n.deliveryTarget===u;let Et=99,de=99,yt=0;for(let I=0;I<O.length;I+=1){const K=O[I];if(K.role==="keeper")continue;const j=K.runner.root.position.x-u.runner.root.position.x,at=(K.runner.root.position.z-u.runner.root.position.z)*u.team,tt=Math.hypot(j,at);Et=Math.min(Et,tt),at>-.35&&at<7.2&&Math.abs(j)<1.9&&(de=Math.min(de,at),yt+=(1-Math.min(1,Math.abs(j)/1.9))*(1-Math.min(1,at/7.2)))}if(u.role==="attacker")if(T!==u.team||b===u||Nt)u.goalRunTimer=Math.max(0,u.goalRunTimer-t*3.2);else{const I=u.runner.root.position.z*u.team,K=et*u.team-I,j=u.home.x===0?Math.sign(u.laneBias||1):Math.sign(u.home.x),at=n.ballHolder&&n.ballHolder.team===u.team?n.ballHolder:v[u.team],tt=at?at.runner.root.position.x:n.ball.position.x,Y=K>2.6&&K<11.8&&Ut>2.4&&Ut<10.5,ft=Et>1.55&&de>1.1&&yt<1.05;if(u.goalRunTimer<=0&&u.goalRunCooldown<=0&&Y&&ft){const Pt=j===0?Math.sign(u.runner.root.position.x-tt||u.laneBias||1):j,se=Dt==="runner"?1.7:Dt==="poacher"?1.15:.9;u.goalRunTargetX=P.clamp(P.lerp(u.runner.root.position.x,Pt*se+tt*.12,Dt==="playmaker"?.4:.6),-Zt+.85,Zt-.85),u.goalRunTargetZ=P.clamp(et-u.team*((Dt==="poacher"?1.05:Dt==="runner"?1.55:1.85)+Math.random()*.8),-Xt+.85,Xt-.5),u.goalRunTimer=1.1+Math.random()*1.15+Math.min(.45,u.pressBias*.18),u.goalRunCooldown=2.4+Math.random()*2.4}}if(u.nameTag){const I=e.distanceTo(u.runner.root.position),K=P.clamp((8.6-Ut)/4.4,0,1),j=P.clamp((42-I)/22,.22,1),at=n.ballHolder===u?1:0,tt=.42+.34*K,Y=P.clamp((tt+at*.2)*j,0,1);u.nameTag.visible=Y>.08,u.nameTag.material.opacity=Y}const Vt=u.home.x+u.roamX,ye=u.home.z+u.roamZ;let qt,D;if(u.role==="keeper"){u.saveCooldown=Math.max(0,u.saveCooldown-t),u.diveBlend=Math.max(0,u.diveBlend-t*2.6),u.saveLift=Math.max(0,u.saveLift-t*1.8);const I=n.ballVel.z*u.team<-.34&&Math.abs(n.ball.position.x)<le*.72,K=rt+u.team*.72,j=Math.abs(n.ballVel.z)>.001?(K-n.ball.position.z)/n.ballVel.z:1/0,at=Number.isFinite(j)?n.ball.position.x+n.ballVel.x*P.clamp(j,0,.55):n.ball.position.x;qt=P.clamp((I?at*.9:n.ball.position.x*.34)+u.roamX*.05,-le*.42,le*.42),D=I?K:rt+P.clamp((n.ball.position.z-rt)*.14,-.28,1.1)}else if(ae==="defender"){const I=u.home.x===0?0:Math.sign(u.home.x),K=Math.abs(u.home.x)<.5,j=K?2.45:3.15,at=rt+u.team*j;if(u===G&&Rt>.22)qt=n.ball.position.x+u.laneBias*(K?.05:.1),D=n.ball.position.z-u.team*(K?.48:.36);else{const tt=K?n.ball.position.x*.12:n.ball.position.x*.32+I*(1.55+Rt*.42),Y=P.lerp(u.home.x,tt,K?.26:.36),ft=n.ball.position.z-u.team*(K?.92:.58),Pt=P.lerp(at,ft,K?.18+Rt*.22:.12+Rt*.16);qt=Y,D=Pt}}else if(ae==="supportAttack"){const I=u.home.x===0?0:Math.sign(u.home.x||u.laneBias||1),K=Math.abs(u.home.x)<.5,j=I!==0&&Gt!==0&&I===Gt,at=I!==0&&Gt!==0&&I!==Gt;if(u===G&&Ut<2.6)u.attackLane="press",qt=n.ball.position.x,D=n.ball.position.z;else if(K){u.attackLane="link";const tt=P.clamp(n.ball.position.x*.22+u.roamX*.16,-2.8,2.8),Y=n.ball.position.z+u.team*(1.35-Rt*.45);qt=P.lerp(Vt,tt,.78),D=P.clamp(Y,-Xt+1.35,Xt-1)}else{const tt=j||Gt===0&&V===0,Y=at||Gt===0&&V!==0;u.attackLane=tt?"overlap":Y?"underlap":"support";const ft=tt?I*(Zt-.95):Y?I*(Zt*.34):I*(Zt-1.35),Pt=tt?n.ball.position.x*.2:Y?n.ball.position.x*.32:n.ball.position.x*.14,se=tt?4.05+u.pressBias*.34:Y?2.45+u.pressBias*.24:3+u.pressBias*.24,Kt=Y?-I*.95:I*.1,be=P.clamp(ft+Pt+Kt+u.roamX*.12,-Zt+.9,Zt-.9),Be=P.clamp(n.ball.position.z+u.team*se,-Xt+.9,Xt-.3);qt=P.lerp(Vt,be,tt?.91:Y?.87:.82),D=Be}}else if(ae==="recoverDefence"){const I=u.home.x===0?Math.sign(u.laneBias||1):Math.sign(u.home.x);if(u===G&&Ut<3.8)qt=n.ball.position.x+u.laneBias*.08,D=n.ball.position.z-u.team*.16;else{const K=P.lerp(u.home.x*.62,n.ball.position.x*.28+I*.85,.54),j=P.lerp(u.home.z-u.team*1.05,n.ball.position.z-u.team*1.05,.4+Rt*.18);qt=K,D=j}}else{const I=u.home.x===0?0:Math.sign(u.home.x);if(T===u.team)if(u===G)qt=n.ball.position.x,D=n.ball.position.z;else if(Yt){const K=I===0?Math.sign(u.laneBias||1):I,j=P.clamp(K*(Zt-1.1),-Zt+.95,Zt-.95),at=P.clamp(n.ball.position.z+u.team*(3.8+Math.max(0,Z)*.45),-Xt+1.1,Xt-.7);qt=P.lerp(Vt,j,.9),D=at}else{const K=Math.abs(u.home.x)<.5,j=P.clamp((ht+.9)/7.2,0,1),at=!K&&(Gt===0?Z===k.length-1:I===-Gt),tt=$>1.08,Y=Dt==="poacher"?"poach":Dt==="runner"?at?"farPost":"poach":Dt==="playmaker"?"boxEdge":K?"poach":at?"farPost":tt&&Z===0?"poach":"boxEdge";u.attackLane=Y;const ft=Gt===0?I*1.7:-Gt*Math.min(le*.7+.55,2.2),Pt=I*(Gt!==0&&I===Gt?Zt*.24:Zt*.18),se=Dt==="playmaker"?-I*.42:Dt==="runner"?I*.18:0,Kt=Y==="poach"?P.clamp(n.ball.position.x*.14+u.roamX*.18,-1.6,1.6):Y==="farPost"?ft+u.roamX*.12+se*.3:Pt+se+n.ball.position.x*(Dt==="playmaker"?.16:.08)+u.roamX*.18,be=P.clamp(P.lerp(u.home.x*.78,Kt,Y==="boxEdge"?.7:.8),-Zt+1.05,Zt-1.05),Be=Y==="poach"?1.3+j*(1.05+$*.16):Y==="farPost"?1.05+j*.95:3.05+j*(.72-Math.min(.16,($-.8)*.18)),Zn=n.ball.position.z+u.team*(Y==="boxEdge"?(Dt==="playmaker"?1.35:1.85)+u.pressBias*.16:(Dt==="runner"?2.7:2.3)+Z*.22+u.pressBias*.22),rn=et-u.team*Be,Yn=Y==="boxEdge"?P.lerp(Zn,et-u.team*(3.45-j*.45),.46+j*.16):P.lerp(Zn,rn,Y==="farPost"?.7+j*.16:.58+j*.24);if(qt=P.lerp(Vt,be+I*(Y==="boxEdge"?.08:0),Y==="boxEdge"?.84:.9),D=P.clamp(Yn,-Xt+1.25,Xt-.62),u.goalRunTimer>0){u.attackLane="breakRun";const He=P.clamp(.56+u.goalRunTimer*.22,.56,.94);qt=P.lerp(qt,u.goalRunTargetX??qt,He*.9),D=P.lerp(D,u.goalRunTargetZ??D,He)}}else if(u===G&&Ut<(Tt?5.2:3.35)||Tt&&u.role==="attacker"&&Ut<4.1)qt=n.ball.position.x+u.laneBias*(Tt?.14:.08),D=n.ball.position.z-u.team*(Tt?.18:.24);else if(Tt){const K=I===0?Math.sign(u.laneBias||1):I,j=u.role==="attacker"?.3:.56,at=u.role==="attacker"?.3:.82+Math.max(0,Z)*.12,tt=P.lerp(u.home.x*.46,n.ball.position.x*.58+K*j,.62),Y=P.lerp(ye,n.ball.position.z-u.team*at,.42+nt*.12);qt=tt,D=Y}else{const K=P.lerp(u.home.x,n.ball.position.x*.34+I*1.12,.48),j=P.lerp(ye,n.ball.position.z-u.team*(1.05+Math.max(0,Z)*.18),.24+Rt*.1);qt=K,D=j}}if(Nt){const I=.18+Math.min(.16,n.deliveryTimer*.2),K=P.clamp(n.ball.position.x+n.ballVel.x*I,-Zt+.7,Zt-.7),j=P.clamp(n.ball.position.z+n.ballVel.z*I,-Xt+.7,Xt-.45);qt=P.lerp(qt,K,.88),D=P.lerp(D,j,.9)}const S=qt-u.runner.root.position.x,W=D-u.runner.root.position.z,Q=Math.max(.001,Math.hypot(S,W)),it=u.role==="keeper"?1.04:Yt?1.54:ae==="supportAttack"||ae==="recoverDefence"?1.34:u.role==="defender"?1.26:1.42,J=Yt?1.08:(ae==="attacker"||ae==="supportAttack")&&Ut<2.4?1:Ut<2.5?.72:.2,wt=1+Math.sin(n.phase*(1.2+(u.tempoRate??1)*.45)+(u.tempoPhase??0))*.09*(u.tempoJitter??1)+Math.sin(n.phase*(2.1+(u.tempoRate??1)*.3)+(u.tempoPhase??0)*1.7)*.04,ct=u.burstTimer>0?(u.burstBoost??0)*P.clamp(u.burstTimer/.85,0,1):0,Ct=u.goalRunTimer>0?.18+Math.min(.16,u.goalRunTimer*.12):0,xt=P.clamp(wt+ct+Ct+(Yt?.06:0),.78,1.48),ot=(it+J*u.pressBias)*u.speedBias*xt,pt=S/Q*ot,Ot=W/Q*ot;u.vx=P.damp(u.vx,pt,8,t),u.vz=P.damp(u.vz,Ot,8,t);for(let I=0;I<n.players.length;I+=1){if(_===I)continue;const K=n.players[I],j=u.runner.root.position.x-K.runner.root.position.x,at=u.runner.root.position.z-K.runner.root.position.z,tt=Math.hypot(j,at);if(tt<Wa*2&&tt>.001){const Y=u.team===K.team?1.1:.72,ft=(Wa*2-tt)*2.7*Y;u.vx+=j/tt*ft*t,u.vz+=at/tt*ft*t}}u.runner.root.position.x+=u.vx*t,u.runner.root.position.z+=u.vz*t,u.runner.root.position.x=P.clamp(u.runner.root.position.x,-Zt+.4,Zt-.4),u.runner.root.position.z=P.clamp(u.runner.root.position.z,-Xt+.4,Xt-.4);const bt=Math.hypot(u.vx,u.vz);bt>.05&&(u.runner.root.rotation.y=Math.atan2(u.vx,u.vz));const dt=P.clamp((bt-(u.role==="keeper"?1.28:1.62))/.9,0,1)+(u.goalRunTimer>0?.42:0)+(u.burstTimer>0?.2:0);u.sprintBlend=P.damp(u.sprintBlend??0,P.clamp(dt,0,1),6.5,t),u.cycle+=t*(4.8+bt*2.8),Wo(u.runner,bt,u.cycle,u.role==="keeper"?u.saveLift:0,u.role==="keeper"&&u.diveBlend>0?{type:"keeperDive",amount:u.diveBlend,dir:u.diveDir,kickAmount:u.kickBlend??0,kickSide:u.kickSide??1,sprintAmount:u.sprintBlend??0}:{kickAmount:u.kickBlend??0,kickSide:u.kickSide??1,sprintAmount:u.sprintBlend??0});const Wt=Ar+(Nt?.18:0);if(b===u&&Ut<Wt&&u.kickCooldown<=0){const I=F_(u,N,O),K=O_(u,N,O,et),j=O.find(Lt=>Lt.role==="keeper")??null,at=j?n.ball.position.x<=j.runner.root.position.x?le*.41:-le*.41:P.clamp(-n.ball.position.x*.28,-le*.4,le*.4),tt=P.clamp(P.lerp(-n.ball.position.x*.06,at,Math.abs(n.ball.position.x)>1.2?.82:.68),-le*.46,le*.46),Y=tt-n.ball.position.x,ft=et-n.ball.position.z,Pt=(et-n.ball.position.z)*u.team,se=Math.abs(n.ball.position.x)>le*.9&&Pt<5.8;let Kt=99,be=0,Be=0;const Zn=Math.max(.001,Math.hypot(Y,ft));for(let Lt=0;Lt<O.length;Lt+=1){const kt=O[Lt];if(Kt=Math.min(Kt,Math.hypot(kt.runner.root.position.x-u.runner.root.position.x,kt.runner.root.position.z-u.runner.root.position.z)),kt.role==="keeper")continue;const Jt=kt.runner.root.position.x-n.ball.position.x,At=kt.runner.root.position.z-n.ball.position.z,oe=P.clamp((Jt*Y+At*ft)/Math.max(.001,Zn*Zn),0,1),$t=n.ball.position.x+Y*oe,we=n.ball.position.z+ft*oe,Ve=Math.hypot(kt.runner.root.position.x-$t,kt.runner.root.position.z-we);if(oe>.24&&oe<.82&&Ve<.62){const De=(.62-Ve)*(.92-Math.abs(oe-.5)*.9);be+=De*1.12,Be+=-Math.sign(kt.runner.root.position.x-n.ball.position.x||1)*De*.22}}const rn=P.clamp(tt+Be,-le*.44,le*.44),Yn=rn-n.ball.position.x,He=Math.hypot(Yn,ft),io=n.deliveryType==="cross"&&n.deliveryTeam===u.team&&n.deliveryTimer>0&&n.deliverySource!==u&&(!n.deliveryTarget||n.deliveryTarget===u),Ni=Pt<3.35&&Math.abs(n.ball.position.x)<le*1.08,Fi=io&&Ni&&n.ballVel.length()>1.55&&(u.role==="attacker"||u.attackLane==="underlap"||u.attackLane==="link"),on=Math.sign(n.ball.position.x||(n.deliverySource?n.deliverySource.runner.root.position.x:1)),xr=Math.sign(u.runner.root.position.x||on||1),Oi=Fi&&on!==0&&xr===-on&&Math.abs(u.runner.root.position.x)>le*.16,ro=Fi&&!Oi&&on!==0&&xr===on&&Math.abs(u.runner.root.position.x)>le*.22,qe=Oi?"backPost":ro?"nearPost":Fi&&!Oi&&!ro?"volley":null,pi=ae==="attacker"||ae==="supportAttack"||Yt,as=C>Xt-6.1,qn=P.clamp((6.8-Pt)/4.6,0,1.35),R=n.lastTouchTeam===u.team?P.clamp((n.sameTeamTouchCount-2)/3.2,0,1.35):0,B=Dt==="playmaker"?.24:Dt==="runner"?-.08:Dt==="poacher"?-.16:0,X=pi?P.clamp($+qn*.22+R*.12+(Yt?.16:0)-B,.28,1.95):P.clamp($,.18,1.2),q=X>1.08,z=pi&&(qn>.52||R>.45||Yt||q&&Pt<6.4),st=I&&I.forward<.75&&I.dist<5.4,lt=ut||as&&(Kt<2.2||n.ballVel.length()<1.35),St=lt?B_(u,N,O):null,Mt=St&&(Kt<2.35||n.stallTimer>1.1||be>.52),Ft=!lt&&(qe!==null||pi&&be<1.18+qn*.3+X*.16&&(He<4.45+qn*1.95+R*.95+X*.9||He<6.7+R*.6+X*.5&&Kt<1.08+qn*.38+X*.1||z&&Pt<6.05+X*.45&&be<1.46||q&&Pt<4.6&&be<1.58||Yt&&He<7.4)),zt=!lt&&K&&pi&&se&&(u.attackLane==="overlap"||Math.abs(n.ball.position.x)>le*1.15||Kt<1.1)&&(!Ft||He>2.4),It=!!(I&&I.throughRun&&!lt&&!zt)&&(I.score>4.15||I.forcedForward)&&(Pt>3.1||qe===null)&&(!Ft||He>3.6||Kt<1.2||be>.62),ie=Ft&&!It,ue=I&&(It||!Mt&&(lt||qe===null&&!zt&&(!pi||I.progressive||I.goalGain>.65||I.dist>3.9-Math.min(.55,(X-.75)*.45)||He>5.15+Math.min(.65,X*.35)||Kt<1.14-Math.min(.12,(X-.7)*.08)||I.forward>(z?1.05+X*.1:.28+Math.min(.3,X*.08))||I.targetDepth>Xt-(5.15+X*.55)||I.score>4.7+qn*.45+Math.max(0,X-1.05)*.95+(Dt==="playmaker"?.95:0)||be>1.02+X*.08))&&!(z&&st&&!I.progressive&&I.score<5.85+X*.35-(Dt==="playmaker"?.5:0))&&!(q&&Pt<5.35&&st&&I.forward<1.2&&!I.progressive));if(zt){const Lt=K.player,kt=.34+Math.min(.18,K.dist*.024),Jt=P.clamp(P.lerp(Lt.runner.root.position.x+Lt.vx*kt,-Math.sign(n.ball.position.x||1)*le*.18,.26),-le*.8,le*.8),At=P.clamp(P.lerp(Lt.runner.root.position.z+Lt.vz*kt,et-u.team*1.35,.22),-Xt+1,Xt-.45),oe=Jt-n.ball.position.x,$t=At-n.ball.position.z,we=Math.max(.001,Math.hypot(oe,$t)),Ve=3.25+Math.min(2.4,we*.31);Pr(u,n.ball),n.ballVel.x=oe/we*Ve,n.ballVel.z=$t/we*Ve,u.kickCooldown=.5+Math.random()*.18,Cr(u,n.ball,.88),Rr(n,u.team,u),n.deliveryType="cross",n.deliveryTeam=u.team,n.deliveryTimer=1.05,n.deliverySource=u,n.deliveryTarget=Lt}else if(ie&&(!ue||He<3.35)){const Lt=qe==="backPost"?P.clamp(-on*le*.34,-le*.42,le*.42):qe==="nearPost"?P.clamp(on*le*.28,-le*.36,le*.36):rn,kt=qe==="volley"||qe===null?Yn:Lt-n.ball.position.x,Jt=ft,At=Math.max(.001,Math.hypot(kt,Jt)),oe=(He<2.6?1.22:He<4.6?1.02:.9)*bc,$t=(qe==="volley"?4.95+Math.random()*.3:qe==="backPost"?4.18+Math.random()*.22:qe==="nearPost"?4.34+Math.random()*.26:3.88+oe*1.16+Math.random()*.34)*(.98+(bc-1)*.7);Pr(u,n.ball),n.ballVel.x=kt/At*$t,n.ballVel.z=Jt/At*$t,u.kickCooldown=qe!==null?.42+Math.random()*.1:.68+Math.random()*.24,Cr(u,n.ball,qe!==null?1.08:1),Rr(n,u.team,u),n.deliveryType=null,n.deliveryTeam=0,n.deliveryTimer=0,n.deliverySource=null,n.deliveryTarget=null}else if(Mt){const Lt=St.x-n.ball.position.x,kt=St.z-n.ball.position.z,Jt=Math.max(.001,Math.hypot(Lt,kt));Pr(u,n.ball),n.ballVel.x=Lt/Jt*St.power,n.ballVel.z=kt/Jt*St.power,u.kickCooldown=.44+Math.random()*.16,Cr(u,n.ball,.96),Rr(n,u.team,u),n.deliveryType=null,n.deliveryTeam=0,n.deliveryTimer=0,n.deliverySource=null,n.deliveryTarget=null}else if(ue){const Lt=I.player,kt=I.throughRun?P.clamp((Lt.goalRunTimer??0)/1.8,0,1.2):0,Jt=(I.leadTime??.42)+(lt?.22:.08)+Math.min(lt?.42:.34,I.dist*(lt?.044:.038))+kt*(lt?.08:.16),At=I.throughRun?Lt.goalRunTargetX??Lt.runner.root.position.x:Lt.runner.root.position.x,oe=I.throughRun?Lt.goalRunTargetZ??Lt.runner.root.position.z:Lt.runner.root.position.z,$t=Lt.runner.root.position.x+Lt.vx*Jt+(At-Lt.runner.root.position.x)*kt*.58,we=Lt.runner.root.position.z+Lt.vz*Jt+u.team*(lt?.3:.14)+(oe-Lt.runner.root.position.z)*kt*.64,Ve=$t-n.ball.position.x,De=we-n.ball.position.z,fn=Math.max(.001,Math.hypot(Ve,De)),_e=lt?3.45+Math.min(2.85,fn*.36):2.7+Math.min(2.45,fn*.34)+(I.throughRun?.28+kt*.42:0);Pr(u,n.ball),n.ballVel.x=Ve/fn*_e,n.ballVel.z=De/fn*_e,u.kickCooldown=.52+Math.random()*.24,Cr(u,n.ball,.9+(I.progressive?.08:0)+(I.throughRun?.1:0)),Rr(n,u.team,u),n.deliveryType="pass",n.deliveryTeam=u.team,n.deliveryTimer=.72+Math.min(.34,fn*.045)+(I.throughRun?.08:0),n.deliverySource=u,n.deliveryTarget=Lt}else{const Lt=lt?u.laneBias*.18+(Math.random()-.5)*.48:u.laneBias*.12+(Math.random()-.5)*.16,kt=u.team*(lt?4.7+Math.random()*1.7:2.15+Math.random()*1),Jt=Math.max(.001,Math.hypot(Lt,kt)),At=lt?3.85+Math.random()*.95:2.25+Math.random()*.72;Pr(u,n.ball),n.ballVel.x=Lt/Jt*At,n.ballVel.z=kt/Jt*At,u.kickCooldown=.42+Math.random()*.22,Cr(u,n.ball,.86),Rr(n,u.team,u),n.deliveryType=null,n.deliveryTeam=0,n.deliveryTimer=0,n.deliverySource=null,n.deliveryTarget=null}}}z_(n)}function tu(n,t){const e={x:n,z:t};if(!oi.colliders||oi.colliders.length===0)return e;for(let i=0;i<4;i+=1){let r=!1;for(let o=0;o<oi.colliders.length;o+=1){const s=oi.colliders[o];if(s.type==="circle"){const v=s.r+Go,g=e.x-s.x,p=e.z-s.z,A=g*g+p*p;if(A<v*v){const T=Math.sqrt(A),y=T>1e-4?g/T:1,L=T>1e-4?p/T:0;e.x=s.x+y*v,e.z=s.z+L*v,r=!0}continue}const a=Math.sin(s.yaw),l=Math.cos(s.yaw),c=e.x-s.x,d=e.z-s.z;let h=c*l+d*a,f=-c*a+d*l;const m=s.halfX+Go,x=s.halfZ+Go;if(Math.abs(h)<=m&&Math.abs(f)<=x){const v=m-Math.abs(h),g=x-Math.abs(f);v<g?h=(h>=0?1:-1)*m:f=(f>=0?1:-1)*x,e.x=s.x+h*l-f*a,e.z=s.z+h*a+f*l,r=!0}}if(!r)break}return e}function V_(n){w.faceTime+=n,w.blinkTimer>0?w.blinkTimer=Math.max(0,w.blinkTimer-n):(w.nextBlink-=n,w.nextBlink<=0&&(w.blinkTimer=.16,w.nextBlink=1.5+Math.random()*2.6)),w.tongueActive?(w.tongueTimer=Math.max(0,w.tongueTimer-n),w.tongueTimer<=0&&(w.tongueActive=!1,w.nextTongueEvent=1.1+Math.random()*3.4)):(w.nextTongueEvent-=n,w.nextTongueEvent<=0&&(w.tongueActive=!0,w.tongueTimer=.2+Math.random()*.55,w.tonguePhase=Math.random()*Math.PI*2)),w.tongueBlend=P.damp(w.tongueBlend,w.tongueActive?1:0,12,n);const t=w.keys.has("Enter")||w.touchJump;t&&!w.prevEnter&&w.jumpState===0&&(w.jumpState=1,w.jumpTimer=0),w.prevEnter=t;const e=w.keys.has("KeyE")||w.touchETrigger;if(e&&!w.prevE)if(w.swordHeld){const f=P.degToRad(w.yaw),m=Math.sin(f),x=Math.cos(f),v=Math.cos(f),g=-Math.sin(f);w.swordHeld=!1,w.swordX=w.x+v*.34+m*.18,w.swordZ=w.z+g*.34+x*.18,w.swordYaw=w.yaw-24}else{const f=w.swordX-w.x,m=w.swordZ-w.z;f*f+m*m<=Mc*Mc&&(w.swordHeld=!0)}w.prevE=e,w.touchETrigger=!1,Zh();const i=.22;if(w.jumpState===1){w.jumpTimer+=n;const f=Math.min(w.jumpTimer/i,1);w.crouchBlend=Math.sin(f*Math.PI),w.pushBlend=f>.62?Math.min((f-.62)/.38,1):0,f>=1&&(w.jumpState=2,w.jumpVel=a_,w.jumpY=.001,w.crouchBlend=0,w.pushBlend=1)}else w.jumpState===2?(w.jumpVel-=s_*n,w.jumpY+=w.jumpVel*n,w.pushBlend=Math.max(0,w.pushBlend-n*8),w.jumpY<=0&&(w.jumpY=0,w.jumpVel=0,w.jumpState=0,w.pushBlend=0)):(w.jumpY=0,w.crouchBlend=0,w.pushBlend=0);w.airBlend=P.clamp(w.airBlend+(w.jumpState===2?n*8:-n*8),0,1);let r=w.touchMove;w.keys.has("ArrowUp")&&(r+=1),w.keys.has("ArrowDown")&&(r-=1),r=P.clamp(r,-1,1);let o=w.touchTurn;w.keys.has("ArrowLeft")&&(o+=1),w.keys.has("ArrowRight")&&(o-=1),o=P.clamp(o,-1,1);let s=1,a=1;w.jumpState===1?(s=.65,a=.65):w.jumpState===2&&(s=.55,a=.55),w.yaw+=o*o_*n*a;const l=P.degToRad(w.yaw),c=Math.sin(l),d=Math.cos(l);w.x+=c*vc*n*r*s,w.z+=d*vc*n*r*s;const h=tu(w.x,w.z);w.x=h.x,w.z=h.z,r!==0?(w.walkBlend=Math.min(1,w.walkBlend+n*6.2),w.walkCycle+=n*8.2*Math.sign(r)):w.walkBlend=Math.max(0,w.walkBlend-n*6.2),o!==0&&r===0?(w.turnBlend=Math.min(1,w.turnBlend+n*7.4),w.turnCycle+=n*8.8*Math.sign(o)):w.turnBlend=Math.max(0,w.turnBlend-n*7.4),w.walkCycle>Math.PI*2&&(w.walkCycle-=Math.PI*2),w.walkCycle<0&&(w.walkCycle+=Math.PI*2),w.turnCycle>Math.PI*2&&(w.turnCycle-=Math.PI*2),w.turnCycle<0&&(w.turnCycle+=Math.PI*2)}function G_(n){if(n.celebration?.active&&n.celebration.scorer){const f=n.celebration,m=f.scorer,x=n.players.filter(C=>C.team===f.team&&C!==m).slice(0,5),v={x:m.runner.root.position.x,y:1.72,z:m.runner.root.position.z,weight:3.8,ball:!0,goal:!1},g={x:f.spotX,y:1.68,z:f.spotZ,weight:2.2,ball:!1,goal:!0},p=[v,g];let A=v.x*v.weight+g.x*g.weight,T=v.z*v.weight+g.z*g.weight,y=v.weight+g.weight;for(let C=0;C<x.length;C+=1){const U=x[C],M=U.role==="keeper"?.9:1.25,_={x:U.runner.root.position.x,y:U.role==="keeper"?1.42:1.62,z:U.runner.root.position.z,weight:M,ball:!1,goal:!1};p.push(_),A+=_.x*M,T+=_.z*M,y+=M}A/=Math.max(.001,y),T/=Math.max(.001,y),A=P.lerp(A,v.x,.62),T=P.lerp(T,v.z,.58);const L=f.orbitSeed+f.pulse*.05;A+=Math.sin(L)*.22*-(f.sideSign||1),T+=Math.cos(L*.9)*.32;let b=2.8;for(let C=0;C<p.length;C+=1){const U=p[C];b=Math.max(b,Math.hypot(U.x-A,U.z-T))}return{focusX:A,focusZ:T,ballX:v.x,ballZ:v.z,goalX:g.x,goalZ:g.z,attackSide:f.team,boxZoom:.92,spread:P.clamp(b,2.6,5.4),points:p}}const t={x:n.ball.position.x,y:.9,z:n.ball.position.z,weight:3.6,ball:!0,goal:!1},e=n.players.map(f=>({p:f,dist:Math.hypot(n.ball.position.x-f.runner.root.position.x,n.ball.position.z-f.runner.root.position.z)})).sort((f,m)=>f.dist-m.dist).slice(0,6),i=n.attackingTeam!==0?n.attackingTeam:Math.abs(n.ballVel.z)>.08?Math.sign(n.ballVel.z||1):n.ball.position.z>=0?1:-1,r=P.clamp((i*n.ball.position.z-(Xt-8.2))/5.2,0,1),o=i*(Xt-.9),s={x:0,y:1.4,z:o,weight:1.2+r*1.85,ball:!1,goal:!0},a=[t,s];let l=t.x*t.weight+s.x*s.weight,c=t.z*t.weight+s.z*s.weight,d=t.weight+s.weight;for(let f=0;f<e.length;f+=1){const m=e[f],x=m.p,v=x===n.ballHolder?1.8:x.role==="keeper"?.38:Math.max(.54,1.34-m.dist*.11),g={x:x.runner.root.position.x,y:x.role==="keeper"?1.35:1.62,z:x.runner.root.position.z,weight:v,ball:!1,goal:!1};a.push(g),l+=g.x*v,c+=g.z*v,d+=v}l/=Math.max(.001,d),c/=Math.max(.001,d),l=P.lerp(l,t.x,.72+r*.1),c=P.lerp(c,P.lerp(t.z,o,.26+r*.16),.46+r*.12);let h=3.1;for(let f=0;f<a.length;f+=1){const m=a[f];h=Math.max(h,Math.hypot(m.x-l,m.z-c))}return{focusX:l,focusZ:c,ballX:t.x,ballZ:t.z,goalX:s.x,goalZ:s.z,attackSide:i,boxZoom:r,spread:P.clamp(h,3.2,9.8),points:a}}function Yc(n,t,e){const i=1-t.boxZoom*.42,r=-t.goalZ,o=P.lerp(0,r,.28-t.boxZoom*.08),s=n*((Zt+2.25)*i),a=(5.15+t.spread*.08)*e*(1-t.boxZoom*.22),l=P.clamp(o,-Xt+1.1,Xt-1.1),c=1.34+Math.min(.56,t.spread*.05),d=P.lerp(t.goalX,t.ballX,.08+t.boxZoom*.05),h=P.lerp(t.goalZ,t.ballZ,.1+t.boxZoom*.04);return{side:n,x:s,y:a,z:l,lookX:d,lookY:c,lookZ:h}}function qc(n,t,e){return n?(n.x=P.damp(n.x,t.x,5.6,e),n.y=P.damp(n.y,t.y,5.4,e),n.z=P.damp(n.z,t.z,5.8,e),n.lookX=P.damp(n.lookX,t.lookX,6.4,e),n.lookY=P.damp(n.lookY,t.lookY,5.2,e),n.lookZ=P.damp(n.lookZ,t.lookZ,6.2,e),n):{...t}}function Oo(n,t){const e=new E(n.x,n.y,n.z),r=new E(n.lookX,n.lookY,n.lookZ).clone().sub(e).normalize(),o=new E(0,1,0),s=new E().crossVectors(r,o).normalize(),a=new E().crossVectors(s,r).normalize(),l=Math.tan(P.degToRad(ce.fov*.5)),c=l*ce.aspect;let d=0,h=!1,f=!1,m=9;for(let x=0;x<t.points.length;x+=1){const v=t.points[x],g=new E(v.x-n.x,v.y-n.y,v.z-n.z),p=g.dot(r);if(p<=.05){d-=v.ball?22:v.goal?12:6;continue}const A=Math.abs(g.dot(s)/Math.max(.001,p*c)),T=Math.abs(g.dot(a)/Math.max(.001,p*l)),y=A<=1.02&&T<=1.02,L=Math.max(0,1.34-A*.88-T*.56);v.ball&&(m=Math.max(A,T)),y?(d+=v.weight*(1.48+L+(v.ball?1:v.goal?.72:0)),v.ball&&(h=!0),v.goal&&(f=!0)):d-=v.weight*(Math.max(0,A-1)*4.6+Math.max(0,T-1)*3.5+(v.goal?.25:.55))}return f||(d-=6.1+t.boxZoom*2.2),d-=Math.max(0,m-.55)*5.4,{score:d,ballVisible:h,goalVisible:f,ballEdge:m}}function W_(n){ce.up.set(0,1,0),(w.keys.has("Equal")||w.keys.has("NumpadAdd"))&&$r(-n*1.25),(w.keys.has("Minus")||w.keys.has("NumpadSubtract"))&&$r(n*1.25),w.cameraZoom=P.damp(w.cameraZoom,w.cameraZoomTarget,10,n),w.cameraZoomMemory[w.activeCam]&&(w.cameraZoomMemory[w.activeCam].zoom=w.cameraZoom,w.cameraZoomMemory[w.activeCam].target=w.cameraZoomTarget);const t=w.cameraZoom;if(w.activeCam===1)xn.rotation.y=P.degToRad(w.cameraYaw),ce.position.set(0,10.4*t,28.8*t),ce.lookAt(0,2.05,0);else if(w.activeCam===3){const e=G_(oi),i=Yc(1,e,t),r=Yc(-1,e,t);if(!w.cam3SetupA||!w.cam3SetupB){w.cam3SetupA={...i},w.cam3SetupB={...r};const m=Oo(w.cam3SetupA,e),x=Oo(w.cam3SetupB,e);w.cam3Side=x.score>m.score?-1:1,w.cam3SideBlend=w.cam3Side}const o=w.cam3Side>=0?1:-1;o>0?w.cam3SetupB=qc(w.cam3SetupB,r,n):w.cam3SetupA=qc(w.cam3SetupA,i,n);const s=o>0?w.cam3SetupA:w.cam3SetupB,a=o>0?w.cam3SetupB:w.cam3SetupA,l=Oo(s,e),c=Oo(a,e),d=c.ballVisible&&c.goalVisible&&c.ballEdge<.62;(l.ballEdge>.75||!l.ballVisible||!l.goalVisible)&&d&&(w.cam3Side=-o,w.cam3SideBlend=w.cam3Side);const f=w.cam3Side>=0?w.cam3SetupA:w.cam3SetupB;xn.rotation.set(0,0,0),xn.position.set(0,0,0),ce.position.set(f.x,f.y,f.z),ce.lookAt(f.lookX,f.lookY,f.lookZ)}else if(w.activeCam===2){w.cam2Distance=P.clamp(w.cam2Distance,5.8,16.5),w.cam2Height=P.clamp(2.5+w.cam2Distance*.18,3,5.8);const e=w.x-w.cam2PrevX,i=w.z-w.cam2PrevZ,r=Math.hypot(e,i);if(r>.003){const g=Math.atan2(e,i),p=-Math.sin(w.cam2Yaw),A=-Math.cos(w.cam2Yaw),T=Math.abs((e*A-i*p)/r);if(T>.42){const y=g+Math.PI,L=Math.atan2(Math.sin(y-w.cam2Yaw),Math.cos(y-w.cam2Yaw));w.cam2Yaw+=L*Math.min(1,n*(2.8+T*3.2))}}const o=1.05,s=.8;w.x>w.cam2FocusX+o?w.cam2FocusX=w.x-o:w.x<w.cam2FocusX-o&&(w.cam2FocusX=w.x+o),w.z>w.cam2FocusZ+s?w.cam2FocusZ=w.z-s:w.z<w.cam2FocusZ-s&&(w.cam2FocusZ=w.z+s);const a=r<.045,l=w.cam2Distance*(a?.5:.78),c=a?3.02:w.cam2Height*.9,d=Math.sin(w.cam2Yaw)*l,h=Math.cos(w.cam2Yaw)*l,f=w.cam2FocusX+d,m=a?c*t:w.jumpY+c*t,x=w.cam2FocusZ+h,v=a?ci+2.94:ci+2.62+w.jumpY*.22;xn.position.set(0,0,0),xn.rotation.set(0,0,0),ce.position.x=P.damp(ce.position.x,f,a?10:8.5,n),ce.position.y=P.damp(ce.position.y,m,a?10:8.5,n),ce.position.z=P.damp(ce.position.z,x,a?10:8.5,n),ce.lookAt(w.cam2FocusX,v,w.cam2FocusZ),w.cam2PrevX=w.x,w.cam2PrevZ=w.z}else{xn.position.set(0,0,0),xn.rotation.set(0,0,0);const e=0,i=44+t*20,r=.01;ce.position.x=P.damp(ce.position.x,e,6.5,n),ce.position.y=P.damp(ce.position.y,i,6.5,n),ce.position.z=P.damp(ce.position.z,r,6.5,n),ce.up.set(0,0,-1),ce.lookAt(0,ci,0)}Uc&&(Uc.textContent=`Active Camera: ${hl[w.activeCam]} | Zoom: ${t.toFixed(2)}x`)}function X_(){Ht.root.position.set(w.x,ci+w.jumpY-w.crouchBlend*.09,w.z),Ht.root.rotation.y=P.degToRad(w.yaw);const n=w.blinkTimer>0?1-w.blinkTimer/.16:0,t=n>0?Math.sin(n*Math.PI):0;let e=Math.max(w.airBlend,w.pushBlend*.85),i=Math.max(w.walkBlend*.52,w.swordHeld?.3:0),r=0,o=0,s=0,a=0;w.faceMode==="calm"?(r=1,i*=.35,e*=.2):w.faceMode==="angry"?(o=1,i=Math.max(i,.88),e*=.15):w.faceMode==="surprised"?(e=Math.max(e,.95),i*=.28):w.faceMode==="happy"?(s=1,i*=.35,e*=.22):w.faceMode==="sad"&&(a=1,i*=.45,e*=.18);const l=P.clamp(.92-t*.9-i*.14-o*.09-a*.08+e*.14+r*.04+s*.03,.05,1.04);Ht.leftEye.scale.y=l,Ht.rightEye.scale.y=l,Ht.leftUpperLid.position.y=.032-t*.034-i*.01-o*.004+e*.005+r*.003+s*.004-a*.003,Ht.rightUpperLid.position.y=.032-t*.034-i*.01-o*.004+e*.005+r*.003+s*.004-a*.003,Ht.leftLowerLid.position.y=-.034+t*.026+i*.006+o*.003-e*.004-r*.003-s*.003+a*.004,Ht.rightLowerLid.position.y=-.034+t*.026+i*.006+o*.003-e*.004-r*.003-s*.003+a*.004,Ht.leftUpperLid.scale.y=.16+t*.62+i*.12+o*.08+a*.05-s*.03,Ht.rightUpperLid.scale.y=.16+t*.62+i*.12+o*.08+a*.05-s*.03,Ht.leftLowerLid.scale.y=.12+t*.3+i*.08+o*.04+a*.03,Ht.rightLowerLid.scale.y=.12+t*.3+i*.08+o*.04+a*.03;const c=P.clamp(w.pointerX*.012,-.016,.016),d=P.clamp(-w.pointerY*.008,-.01,.01);Ht.leftPupil.position.set(Ht.pupilBase.left.x+c,Ht.pupilBase.left.y+d,Ht.pupilBase.left.z),Ht.rightPupil.position.set(Ht.pupilBase.right.x+c,Ht.pupilBase.right.y+d,Ht.pupilBase.right.z);const h=Math.sin(w.walkCycle*2)*.018*w.walkBlend+Math.sin(w.faceTime*1.8)*.006,f=-w.crouchBlend*.045+w.pushBlend*.016+w.airBlend*.02;Ht.head.position.y=3.27+h+f,Ht.head.rotation.x=P.degToRad(-4*w.crouchBlend+7*w.pushBlend-4*w.airBlend-i*3+s*1.5+a*4.5),Ht.head.rotation.z=w.pointerX*.06+Math.sin(w.walkCycle)*.018*w.walkBlend;const m=.026*e-.014*i+.012*r-.01*o+.014*s-.02*a+.004*Math.sin(w.faceTime*2.4),x=12*i-9*e+12*o-4*r-5*s+6*a,v=.018*i-.008*e+.016*o-.006*r-.004*s+.008*a;Ht.leftBrow.position.set(Ht.browBase.left.x+v,Ht.browBase.left.y+m,Ht.browBase.left.z),Ht.rightBrow.position.set(Ht.browBase.right.x-v,Ht.browBase.right.y+m,Ht.browBase.right.z),Ht.leftBrow.rotation.z=P.degToRad(82-x-s*2+a*3),Ht.rightBrow.rotation.z=P.degToRad(-82+x+s*2-a*3);const g=Math.max(0,Math.sin(w.faceTime*9.5))*.058*w.walkBlend+Math.max(0,Math.sin(w.faceTime*5.8))*.02,p=P.clamp(.03+g+e*.17-i*.012-o*.014-a*.005,.012,.28),A=.14*(1-i)*(1-e*.7)+r*.06-o*.09+s*.24-a*.16;Ht.mouth.position.y=-.172-w.crouchBlend*.007+w.airBlend*.014+i*.004-a*.014+s*.008,Ht.mouth.rotation.z=Math.sin(w.faceTime*3.8)*.03*w.walkBlend*(1-o*.9)+s*.01-a*.008,Ht.mouthLine.scale.set(2.04+A-p*.58,.18+p*2.95+r*.03+s*.05,.52),Ht.mouthInner.scale.set(1.3+p*.72-i*.1-o*.18-a*.15,.05+p*4.9+s*.06,.4+p*.42),Ht.mouthInner.position.y=-.008-p*.026-s*.005+a*.012;const T=p>.045&&s<.97&&a<.97,y=T?w.tongueBlend:0,L=Math.sin(w.faceTime*11.2+w.walkCycle*.45+w.tonguePhase),b=Math.sin(w.faceTime*7.6+.35+w.tonguePhase*.5),C=Math.sin(w.faceTime*5.2+w.walkCycle*.3+w.tonguePhase),U=P.clamp(((p-.05)*4.2+e*.5+s*.12)*y,0,1.15);Ht.tongue.visible=T&&y>.12,Ht.tongue.scale.set(1.38+U*.26,.22+y*(p*1.25+.08*(1+b)),.86+U*.5+.06*y*L),Ht.tongue.position.set(.012*y*C,-.02-y*(p*.017)+.005*y*b,.018+U*.024+.003*y*L),Ht.tongue.rotation.x=P.degToRad(8+U*16+y*b*8),Ht.tongue.rotation.y=y*C*.11,Ht.tongue.rotation.z=y*L*.12,Nc&&(Nc.textContent=`Active Face: ${Vh[w.faceMode]}`),[{arm:Ht.leftArm,side:1},{arm:Ht.rightArm,side:-1}].forEach(({arm:u,side:N})=>{const O=N===-1?w.walkCycle+Math.PI:w.walkCycle,k=Math.sin(O)*10*w.walkBlend*(1-w.airBlend*.65),H=N===-1&&w.swordHeld;u.upperPivot.rotation.z=P.degToRad(N*14),u.upperPivot.rotation.x=P.degToRad(-(4+15*w.airBlend+6*w.pushBlend-5*w.crouchBlend+k)),u.lowerPivot.rotation.x=P.degToRad(-(8+10*w.airBlend+(H?10:0))),u.gripHand&&(u.gripHand.visible=H,u.openHand.visible=!H)}),[{leg:Ht.leftLeg,side:1},{leg:Ht.rightLeg,side:-1}].forEach(({leg:u,side:N})=>{const O=N===-1?w.walkCycle:w.walkCycle+Math.PI,k=w.turnCycle+(N===-1?Math.PI:0),H=Math.sin(k)*15*w.turnBlend*(1-w.airBlend),G=(-Math.sin(k)+1)*.5*w.turnBlend*(1-w.airBlend);let Z=Math.sin(O)*24*w.walkBlend*(1-w.crouchBlend*.75);Z=Z-12*w.crouchBlend+7*w.pushBlend,Z+=H;let V=8+(10+16*((-Math.sin(O)+1)*.5))*w.walkBlend;V=V+40*w.crouchBlend-10*w.pushBlend,V+=G*13;let et=-5-Z*.38-(V-8)*.22+6*w.pushBlend;et+=G*-5,w.airBlend>0&&(Z=P.lerp(Z,-2,w.airBlend),V=P.lerp(V,2,w.airBlend),et=P.lerp(et,34,w.airBlend)),u.root.rotation.z=P.degToRad(N*4),u.root.rotation.x=P.degToRad(-4+Z),u.kneePivot.rotation.x=P.degToRad(V),u.footPivot.rotation.x=P.degToRad(et)}),zr.root.visible=!w.swordHeld,zr.root.position.set(w.swordX,.028,w.swordZ),zr.root.rotation.set(P.degToRad(12),P.degToRad(w.swordYaw),P.degToRad(90)),Ht.heldSword.root.visible=w.swordHeld}function Z_(){if(w.activeCam!==3){Oe.style.display="none";return}const n=w.cam3Side>=0?w.cam3SetupB:w.cam3SetupA;if(!n){Oe.style.display="none";return}const t=Math.max(1,window.innerWidth),e=Math.max(1,window.innerHeight),i=Math.round(t*.24),r=Math.round(i/1.62),o=18,s=t-i-o,a=e-r-o;Oe.style.display="block",Oe.style.left=`${s}px`,Oe.style.top=`${e-a-r}px`,Oe.style.width=`${i}px`,Oe.style.height=`${r}px`,ii.fov=ce.fov,ii.aspect=i/Math.max(1,r),ii.updateProjectionMatrix(),ii.position.set(n.x,n.y,n.z),ii.lookAt(n.lookX,n.lookY,n.lookZ),$e.clearDepth(),$e.setScissorTest(!0),$e.setViewport(s,a,i,r),$e.setScissor(s,a,i,r),$e.render(dn,ii),$e.setScissorTest(!1),$e.setViewport(0,0,t,e)}function eu(n){const t=Math.min((n-w.lastT)/1e3,.05);w.lastT=n,V_(t),H_(oi,t),W_(t),X_(),$e.setViewport(0,0,window.innerWidth,window.innerHeight),$e.setScissorTest(!1),$e.render(dn,ce),Z_(),requestAnimationFrame(eu)}requestAnimationFrame(n=>{w.lastT=n,eu(n)});function Y_(){return window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0}function cn(n,t=!1){Zs&&(Zs.textContent=`PWA: ${n}`,Zs.classList.toggle("is-error",t))}function ss(){Qo&&(Qo.hidden=!Pi||Y_())}Qo&&Qo.addEventListener("click",async()=>{if(!Pi)return;Pi.prompt(),(await Pi.userChoice).outcome!=="accepted"&&(Pi=null),ss()});window.addEventListener("beforeinstallprompt",n=>{n.preventDefault(),Pi=n,cn("install prompt ready"),ss()});window.addEventListener("appinstalled",()=>{Pi=null,cn("app installed"),ss()});"serviceWorker"in navigator?window.addEventListener("load",async()=>{cn("registering service worker...");try{const n=await navigator.serviceWorker.register("/sw.js");cn("service worker registered, waiting for activation"),navigator.serviceWorker.ready.then(()=>{cn("service worker ready, waiting for installability")}).catch(e=>{cn(`service worker readiness failed: ${e.message}`,!0)});const t=n.installing;t?t.addEventListener("statechange",()=>{cn(`service worker state: ${t.state}`)}):n.waiting?cn("service worker waiting to activate"):n.active&&cn("service worker active, waiting for installability")}catch(n){cn(`service worker failed: ${n.message}`,!0),console.error("Service worker registration failed",n)}ss()}):"serviceWorker"in navigator?cn("service worker runs only in production builds"):cn("service workers are not supported",!0);
